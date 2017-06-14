import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const isOnDev = window.location.host.indexOf('.dev') !== -1
const isOnDomain = window.location.host.indexOf('.design') !== -1
const isOnHttps = window.location.protocol.indexOf('https') !== -1
if (isOnDomain && !isOnHttps)
  window.location.protocol = 'https'
else {
  ReactDOM.render(<App />, document.getElementById('root'));
  if (!isOnDev) registerServiceWorker();
}
