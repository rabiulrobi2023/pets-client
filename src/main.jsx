import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/PublicRouter/PublicRouter';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthContext from './Context/AuthContext/AuthContext';
const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>

    </QueryClientProvider>
  </React.StrictMode>,
)
