import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux'; // Import Redux Provider
import { store } from './store/store'; // Import the Redux store
import 'bootstrap/dist/css/bootstrap.min.css';

/* const injectFavicon = () => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = '/450_short_light.svg';
  document.head.appendChild(link);
}; */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap App with Redux Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);
