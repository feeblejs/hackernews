import 'babel-polyfill'
import feeble from 'feeble'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import models from './models'
import './index.css';

const app = feeble()

app.model(...models)

app.router(routes)

const tree = app.start()

ReactDOM.render(tree, document.getElementById('root'))
