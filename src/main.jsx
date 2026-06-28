import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router.jsx'
import './scss/all.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css"
import 'yet-another-react-lightbox/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
