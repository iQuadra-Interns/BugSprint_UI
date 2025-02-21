import { useSelector } from "react-redux";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn.jsx";
import BugsListScreen from "./components/BugsListScreen.jsx";
import CreateBug from "./components/CreateBug/CreateBug.jsx";
import EditBug from "./components/EditBug.jsx";
import MyProfile from "./components/MyProfile";
import Error404Page from "./components/Error404Page";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/MyProfile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/MyDashboard" element={<ProtectedRoute><BugsListScreen /></ProtectedRoute>} />
      <Route path="/CreateBug" element={<ProtectedRoute><CreateBug /></ProtectedRoute>} />
      <Route path="/bug/:id" element={<ProtectedRoute><EditBug /></ProtectedRoute>} />
      <Route path="*" element={<Error404Page />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
