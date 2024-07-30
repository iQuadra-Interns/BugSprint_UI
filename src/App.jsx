import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'
// import NavigationBar from './components/NavigationBar';
import MyProfile from './components/MyProfile';
import { useState } from 'react'
import { createRoot } from "react-dom/client";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MyProfile/>}/>
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