// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Auth0Provider
    domain="dev-oiqyvi5wk72bul60.us.auth0.com"
    clientId="fq9nNESLmG7pMGNYZcwK6x7Ofh3dzpxV"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <App />
  </Auth0Provider>
  // </StrictMode>,
)
