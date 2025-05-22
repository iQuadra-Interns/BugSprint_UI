import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SignIn from "./components/SignIn.jsx";
import BugsListScreen from "./components/BugsListScreen.jsx";
import CreateBug from "./components/CreateBug/CreateBug.jsx";
import EditBug from "./components/EditBug.jsx";
import MyProfile from "./components/MyProfile";
import Settings from "./components/Settings.jsx";
import TestCases from "./components/TestCases/TestCases";
import Error404Page from "./components/Error404Page";
import PrivateRoute from "./components/PrivateRoute.jsx";
import TestCasesList from "./components/TestCasesList/TestCasesList.jsx";

import allUrls from "./Baseurls.jsx";
import { env } from "./EnvironmentMaintaince.js";

// Create router outside component
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/MyProfile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
      <Route path="/MyDashboard" element={<PrivateRoute><BugsListScreen /></PrivateRoute>} />
      <Route path="/CreateBug" element={<PrivateRoute><CreateBug /></PrivateRoute>} />
      <Route path="/bug/:id" element={<PrivateRoute><EditBug /></PrivateRoute>} />
      <Route path="/Settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/TestCases" element={<PrivateRoute><TestCases /></PrivateRoute>} />
      <Route path="/TestCasesList" element={<PrivateRoute><TestCasesList /></PrivateRoute>} />
      <Route path="*" element={<Error404Page />} />
    </Route>
  )
);

function App() {

 
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logout") {
        window.location.href = "/";
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="app-container">
        {/* Show current environment mode */}
        <div style={{ padding: "0.5rem", fontSize: "0.9rem", color: "#555", background: "#f0f0f0", marginBottom: "1rem" }}>
          Current Environment: <strong>{env.toUpperCase()}</strong>
        </div> 
        <div className="main-content">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;