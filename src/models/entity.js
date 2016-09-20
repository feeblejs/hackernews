import feeble from 'feeble'
import Immutable from 'immutable'

const model = feeble.model({
  namespace: 'entity',
  state: Immutable.fromJS({
    story: {},
    user: {},
  }),
})

model.action('set')

model.reducer(on => {
  on(model.set, (state, payload) => state.mergeDeep(payload.entities))
})

export default model
