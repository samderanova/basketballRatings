import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

export const url = 'https://pure-peak-83435.herokuapp.com'


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
