import feeble from 'feeble'
import { fork, take, call, put, race, cancel } from 'feeble/effects'
import { eventChannel } from 'feeble/effects/helper'
import { watchIdsByType, fetchStorys } from '../services/db'

const models = []
const PER_PAGE = 20

export default function factory(type) {
  if (models[type]) {
    return models[type]
  }

  const model = feeble.model({
    namespace: `story::${type}`,
    state: {
      ids: [],
      items: [],
    },
  })

  models[type] = model

  model.action('watch')
  model.action('unwatch')
  model.action('setIds')
  model.action('setItems')

  model.reducer(on => {
    on(model.setIds, (state, payload) => ({
      ...state,
      ids: payload,
    }))

    on(model.setItems, (state, payload) => ({
      ...state,
      items: payload,
    }))
  })

  function listChannel() {
    return eventChannel(emitter => {
      const unwatch = watchIdsByType(type, ids => {
        emitter(ids)
      })

      return unwatch
    })
  }

  function* watchList() {
    const chan = yield call(listChannel)
    while (true) {
      const ids = yield take(chan)
      yield put(model.setIds(ids))
      const storys = yield call(fetchStorys, ids)
      yield put(model.setItems(storys))
    }
  }

  model.effect(function* () {
    let lastTask
    while (true) {
      const { watch } = yield race({
        watch: take(model.watch),
        unwatch: take(model.unwatch),
      })
      if (lastTask) {
        yield cancel(lastTask)
      }
      if (watch) {
        lastTask = yield fork(watchList)
      }
    }
  })

  model.selector('activeStories',
    props => model.getState().items,
    props => props.params.page || 1,
    (stories, page) => {
      const start = (page - 1) * PER_PAGE
      const end = page * PER_PAGE
      return stories.slice(start, end)
    }
  )

  model.selector('maxPage',
    () => model.getState().ids,
    ids => Math.ceil(ids.length / PER_PAGE)
  )

  return model
}

