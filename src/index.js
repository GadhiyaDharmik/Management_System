import React from "react"
// import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"

import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter, Routes } from "react-router-dom"
import { Provider } from "react-redux"
// import ProtectedRoute from "./routes/Private/authMiddelware"

import store from "./store"

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)
const root = createRoot(document.getElementById("root"))
root.render(app)
// serviceWorker.unregister()
