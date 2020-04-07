import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Grid } from 'component/Grid/Grid'
import { Tile } from 'component/Tile/Tile'

// Add dropdown consist number of grid ex. 16x16, 32x32, ..etc
// Add group button : New, Clear All Grid, Save to Local Computer, Delete
// Add button for color change
// Add text box for art or file name

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
