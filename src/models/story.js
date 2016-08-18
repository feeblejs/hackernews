import feeble from 'feeble'
import { call, put } from 'feeble/effects'
import { takeEvery } from 'feeble/effects/helper'
import { fetchIdsByType, fetchStorys } from '../services/db'

const PER_PAGE = 20

const model = feeble.model({
  namespace: 'story',
  state: {
    data: [],
  },
})

model.action('fetch')
model.action('fetchDone')

model.reducer(on => {
  on(model.fetchDone, (state, payload) => ({
    ...state,
    data: payload,
  }))
})

model.effect(function* () {
  yield* takeEvery(model.fetch, function* () {
    const ids = yield call(fetchIdsByType, 'top')
    const storys = yield call(fetchStorys, ids)
    yield put(model.fetchDone(storys))
  })
})

model.selector('activeStories',
  props => model.getState().data,
  props => props.params.page || 1,
  (stories, page) => {
    const start = (page - 1) * PER_PAGE
    const end = page * PER_PAGE
    return stories.slice(start, end)
  }
)

model.selector('maxPage',
  () => model.getState().data,
  stories => Math.ceil(stories.length / PER_PAGE)
)

export default model
