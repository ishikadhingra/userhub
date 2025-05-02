// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import Login from './component/Login.jsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Provider } from 'react-redux'
// import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Home from './pages/Home.jsx'
// import { AuthLayout, Login } from './components/index.js'
import { createRoot } from 'react-dom/client'
// import Signup from './pages/Signup'
import Form from './pages/user-form.jsx';
import UserList from './pages/user-listing.jsx';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ProtectedDashboard } from './components/HOC/AuthExample.jsx'
// import DummyPrac from './components/JSPrac/index.jsx'
// import ColorChanger from './components/JSPrac/colorChanger.jsx'
import Dashboard from './component/Dashboard.jsx';
import Overview from './pages/Overview.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Overview />,
          },
          {
            path: "/dashboard/user-form",
            element: <Form />,
          },
          {
            path: "/dashboard/user-list",
            element: <UserList />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
