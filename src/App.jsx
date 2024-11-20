import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import SignInForm from './components/SignInForm.jsx';
import SignIn from './components/SignIn.jsx';
import BugsListScreen from './components/BugsListScreen.jsx';
import MyProfile from './components/MyProfile';
import CreateBug from './components/CreateBug/CreateBug.jsx';

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access authentication state from Redux
  return isAuthenticated ? children : <Navigate to="/" />; // If not authenticated, redirect to SignIn page
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/MyProfile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/MyDashboard" element={<ProtectedRoute><BugsListScreen /></ProtectedRoute>} />
      <Route path="/CreateBug" element={<CreateBug/>}/> 
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
