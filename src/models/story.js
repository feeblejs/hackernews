import feeble from 'feeble'
import { fork, take, call, put, race, cancel } from 'feeble/effects'
import { takeEvery, eventChannel } from 'feeble/effects/helper'
import { normalize } from 'normalizr'
import Schemas from '../config/schemas'
import { watchIdsByType, fetchItems, fetchItem } from '../services/db'
import Entity from './entity'

const models = []
const PER_PAGE = 20

export default function factory(type) {
  if (models[type]) {
    return models[type]
  }

  const model = feeble.model({
    namespace: `story::${type}`,
    state: {
      loading: false,
      ids: [],
    },
  })

  models[type] = model

  model.action('watch')
  model.action('unwatch')
  model.action('setIds')
  model.action('fetchOne')

  model.reducer(on => {
    on(model.watch, (state, payload) => ({
      ...state,
      loading: true,
    }))

    on(model.setIds, (state, payload) => ({
      ...state,
      loading: false,
      ids: payload,
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

  function* doWatchList() {
    const chan = yield call(listChannel)
    while (true) {
      const ids = yield take(chan)
      const storys = yield call(fetchItems, ids)
      const normalized = normalize(storys, Schemas.STORY_ARRAY)
      yield put(Entity.set(normalized))
      yield put(model.setIds(normalized.result))
    }
  }

  function* watchList() {
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
        lastTask = yield fork(doWatchList)
      }
    }
  }

  function* fetchOne() {
    yield* takeEvery(model.fetchOne, function* ({ payload }) {
      const story = yield call(fetchItem, payload)
      const normalized = normalize(story, Schemas.STORY)
      yield put(Entity.set(normalized))
    })
  }

  model.effect(function* () {
    yield [
      fork(watchList),
      fork(fetchOne),
    ]
  })

  model.selector('list',
    () => Entity.getState().story,
    props => {
      const page = props.params.page || 1
      const start = (page - 1) * PER_PAGE
      const end = page * PER_PAGE
      return model.getState().ids.slice(start, end)
    },
    (stories, ids) => ids.map(id => stories[id])
  )

  model.selector('maxPage',
    () => model.getState().ids,
    ids => Math.ceil(ids.length / PER_PAGE)
  )

  model.selector('one',
    () => Entity.getState().story,
    id => id,
    (stories, id) => stories[id]
  )

  return model
}

