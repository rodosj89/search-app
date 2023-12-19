import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import NotFound from './components/NotFound.jsx'
import PacksProvider from './context/packsContext.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        Component: () =>(
          <PacksProvider> <App /> </PacksProvider>
          ) 
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>
)