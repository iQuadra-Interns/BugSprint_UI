import { useState } from 'react'
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
// import NavigationBar from './components/NavigationBar';
import SideBar from './components/Sidebar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignIn/>}/>
      <Route path="/" element={<SignIn/>}/>
    </Route>
  )
)

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer />

      
    </>
  )
}

export default App
