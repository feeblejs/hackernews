import React, { PropTypes } from 'react'
import { Router, Route, IndexRedirect } from 'feeble/router'
import App from '../containers/App'
import * as Story from '../containers/Story'

export default function routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="top" />
        <Route path="top" component={Story.ListPage} />
        <Route path="top/:page" component={Story.ListPage} />
      </Route>
    </Router>
  )
}

routes.propTypes = {
  history: PropTypes.object.isRequired,
}
