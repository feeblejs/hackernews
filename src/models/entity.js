import feeble from 'feeble'
import merge from 'lodash/fp/merge'

const model = feeble.model({
  namespace: 'entity',
  state: {
    story: {},
  },
})

model.action('update')

model.reducer(on => {
  on(model.update, (state, payload) => merge(state, payload.entities))
})

export default model
