import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './index/containers/App'
import configureStore from './index/store/configureStore'
import 'todomvc-app-css/index.css'
import 'react-datetime/css/react-datetime.css'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
