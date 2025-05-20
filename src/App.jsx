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
        window.location.href = "/"; // Redirect to login page
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
        <div className="main-content">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;