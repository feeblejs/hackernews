import 'babel-polyfill'
import feeble from 'feeble'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import models from './models'
import './index.css';

const app = feeble()

app.model(...models)

if (process.env.NODE_ENV === 'development') {
  app.middleware(require('redux-logger')())
}

app.router(routes)

const tree = app.start()

ReactDOM.render(tree, document.getElementById('root'))
