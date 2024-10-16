import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './components/SignIn.jsx';
import './components/SignInForm.jsx';
import SignInForm from './components/SignInForm.jsx';
import SignIn from './components/SignIn.jsx';
import BugsListScreen from './components/BugsListScreen.jsx';
import MyProfile from './components/MyProfile';
import { createRoot } from "react-dom/client";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './components/Sidebar';

// Protected Route Component to handle authentication
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access authentication state from Redux
  return isAuthenticated ? children : <Navigate to="/" />; // If not authenticated, redirect to SignIn page
}

// Router Configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/MyProfile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/MyDashboard" element={<ProtectedRoute><BugsListScreen /></ProtectedRoute>} />
    </Route>
  )
)

function App() {
  return (
    <>
      {/* Bootstrap Container for Layout */}
      <Container fluid className="vh-100 p-0">
        <Row className="h-100 m-0">
          {/* Sidebar Column */}
          <Col xs={2} className="p-0">
            <SideBar />
          </Col>

          {/* Main Content Area */}
          <Col xs={10}>
            {/* RouterProvider for Routing */}
            <RouterProvider router={router} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
