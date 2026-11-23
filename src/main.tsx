import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {BrowserRouter} from "react-router";
import {AuthModalProvider} from "./context/AuthModalProvider.tsx";
import {ProfileMenuProvider} from "./context/ProfileMenuProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <AuthModalProvider>
              <ProfileMenuProvider>
                  <Provider store={store}>
                      <App />
                  </Provider>
              </ProfileMenuProvider>
          </AuthModalProvider>
      </BrowserRouter>
  </StrictMode>,
)
