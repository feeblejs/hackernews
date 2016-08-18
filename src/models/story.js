import feeble from 'feeble'
import { call, put } from 'feeble/effects'
import { takeEvery } from 'feeble/effects/helper'
import { fetchIdsByType, fetchStorys } from '../services/db'

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

export default model
