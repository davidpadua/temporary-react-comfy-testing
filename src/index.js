import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-qpm4tl67.us.auth0.com
// 3mrYTOMZjX9korzYQaQhY7wv2z8nzQoi
//::: NOTA: fazer novamente yarn start para o .env ser reconhecido e sempre que se fizerem alterações à key no .env

//:::: Auth0 app React Comfy Store DOMAIN 
const AUTH0_URL = process.env.REACT_APP_AUTH0_URL;
//:::: Auth0 app React Comfy Store CLIENT ID
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
    <Auth0Provider
        domain={AUTH0_URL}
        clientId={AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
    >
      <UserProvider>
        <ProductsProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </ProductsProvider> 
      </UserProvider>
  </Auth0Provider>,

    document.getElementById('root')
    
    )
