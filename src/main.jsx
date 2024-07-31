import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Favicon from 'react-favicon'
import {Helmet} from "react-helmet";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet>
      <title>BugSprint</title>
    </Helmet>
    <Favicon url='smallLogo.ico' />
    <App />
  </React.StrictMode>,
)