import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {BrowserRouter} from "react-router";
import {AuthModalProvider} from "./context/AuthModalProvider.tsx";
import {ProfileMenuProvider} from "./context/ProfileMenuProvider.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import APP_ENV from "./env";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_CLIENT_ID}>
              <AuthModalProvider>
                  <ProfileMenuProvider>
                      <Provider store={store}>
                          <App />
                      </Provider>
                  </ProfileMenuProvider>
              </AuthModalProvider>
          </GoogleOAuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
