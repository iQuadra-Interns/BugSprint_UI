import { useSelector } from "react-redux";
import "./App.css";
import "./components/SignIn.jsx";
import "./components/SignInForm.jsx";
import SignIn from "./components/SignIn.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BugsListScreen from "./components/BugsListScreen.jsx";
import MyProfile from "./components/MyProfile";
import EditBug from "./components/EditBug.jsx";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/MyProfile" element={<MyProfile />} />
      <Route path="/MyDashboard" element={<BugsListScreen />} />
      <Route path="/view-bug" element={<EditBug />} />
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
