import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WelcomeScreen from './pages/WelcomeScreen';
import {RouterProvider } from 'react-router-dom';
import routers from './routers'; 


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={routers}/>
  </React.StrictMode>
);

