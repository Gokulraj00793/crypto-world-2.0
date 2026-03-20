import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CryptoProvider } from './context/CryptoContext'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CryptoProvider>
        <App />
      </CryptoProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
