import feeble from 'feeble'
import merge from 'lodash/fp/merge'

const model = feeble.model({
  namespace: 'entity',
  state: {
    story: {},
    user: {},
  },
})

model.action('set')

model.reducer(on => {
  on(model.set, (state, payload) => merge(state, payload.entities))
})

export default model
