import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContractPage from './components/ContractPage/ContractPage.jsx'
import Register from './components/Register/Register.jsx'
import { AppKitProvider } from './WagmiProvider.jsx'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppKitProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/contract" element={<ContractPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </Provider>
    </AppKitProvider>
  </StrictMode>
)
