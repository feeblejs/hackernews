import feeble from 'feeble'
import { call, put } from 'feeble/effects'
import { takeLatest } from 'feeble/effects/helper'
import { normalize } from 'normalizr'
import Schemas from '../config/schemas'
import { fetchUser } from '../services/db'
import Entity from './entity'

const model = feeble.model({
  namespace: 'user',
  state: {},
})

model.action('fetchOne')

model.effect(function* () {
  yield* takeLatest(model.fetchOne, function* ({ payload }) {
    const user = yield call(fetchUser, payload)
    const normalized = normalize(user, Schemas.USER)
    yield put(Entity.update(normalized))
  })
})

model.selector('one',
  () => Entity.getState().user,
  id => id,
  (users, id) => users[id]
)

export default model
