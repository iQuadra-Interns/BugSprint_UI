import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'; // Import Redux Provider
import { store } from './store/store'; // Import the Redux store
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AdminRouter from "./routes/Admin.jsx";
import UserRouter from "./routes/user.jsx";
import PublicRouter from "./routes/Public.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

// Configurable routes
const RouteHandler = {
  User: UserRouter,   // Routes for authenticated users
  Admin: AdminRouter, // Routes for admin users
  Public: PublicRouter, // Routes for public access (e.g., landing page, sign in, sign up, public blogs)
};

// User type and authorization
const user_type = "User"; // Can be dynamically set based on authentication
let authorized = true; // Placeholder for frontend authorization. Integrate this with API authentication later.

/* Optional: Inject favicon logic */
// const injectFavicon = () => {
//   const link = document.createElement('link');
//   link.rel = 'icon';
//   link.type = 'image/svg+xml';
//   link.href = '/450_short_light.svg';
//   document.head.appendChild(link);
// };
// injectFavicon(); // Uncomment to inject the favicon dynamically.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the app with Redux Provider to give global state access */}
    <Provider store={store}>
      {authorized ? (
        // Render the router based on the user type (User/Admin) if authorized
        <RouterProvider router={RouteHandler[user_type]} />
      ) : (
        // If not authorized, render the public routes (SignIn, SignUp, etc.)
        <RouterProvider router={RouteHandler["Public"]} />
      )}
    </Provider>
  </React.StrictMode>
);
