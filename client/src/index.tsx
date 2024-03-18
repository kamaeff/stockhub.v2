import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
// import 'dotenv/config';

import './index.scss';
import App from './App';
import {store} from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
