import React, { PropTypes } from 'react'
import { Router, Route, IndexRedirect } from 'feeble/router'
import App from '../containers/App'
import * as Story from '../containers/Story'

export default function routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="top" />
        <Route path="top(/:page)" component={Story.createListPage('top')} />
        <Route path="new(/:page)" component={Story.createListPage('new')} />
        <Route path="show(/:page)" component={Story.createListPage('show')} />
        <Route path="ask(/:page)" component={Story.createListPage('ask')} />
        <Route path="job(/:page)" component={Story.createListPage('job')} />
      </Route>
    </Router>
  )
}

routes.propTypes = {
  history: PropTypes.object.isRequired,
}
