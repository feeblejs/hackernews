import feeble from 'feeble'
import { call, put } from 'feeble/effects'
import { takeLatest } from 'feeble/effects/helper'
import { normalize } from 'normalizr'
import Schemas from '../config/schemas'
import { fetchUser } from '../services/db'
import Entity from './entity'
import Immutable from 'immutable'

const model = feeble.model({
  namespace: 'user',
  state: Immutable.fromJS({}),
})

model.action('fetchOne')

model.effect(function* () {
  yield* takeLatest(model.fetchOne, function* ({ payload }) {
    const user = yield call(fetchUser, payload)
    const normalized = normalize(user, Schemas.USER)
    yield put(Entity.set(normalized))
  })
})

model.selector('one',
  () => Entity.getState().get('user'),
  id => id,
  (users, id) => users.get(id.toString())
)

export default model
