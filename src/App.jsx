import { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/SignIn.jsx'
import './components/SignInForm.jsx'
import SignInForm from './components/SignInForm.jsx'
import SignIn from './components/SignIn.jsx'
import { createRoot } from "react-dom/client";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'
import BugsListScreen from './components/BugsListScreen.jsx'
import MyProfile from './components/MyProfile.jsx';

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access authentication state from Redux
  return isAuthenticated ? children : <Navigate to="/" />; // If not authenticated, redirect to SignIn page
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignIn/>}/>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/MyProfile" element={<MyProfile/>}/>
      <Route path="/MyDashboard" element={<BugsListScreen/>}/>
    </Route>
  )
)


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
