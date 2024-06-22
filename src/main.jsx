import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AdminRouter from "./routes/Admin.jsx";
import UserRouter from "./routes/user.jsx";
import PublicRouter from "./routes/Public.jsx";

// Configurable routes
const RouteHandler = {
  User: UserRouter,   // Routes for authenticated users
  Admin: AdminRouter, // Routes for admin users
  Public: PublicRouter, // Routes for public access (e.g., landing page, sign in, sign up, public blogs)
};

const user_type = "User";

let authorized = true; // Placeholder for frontend authorization. To be integrated with API authentication once available.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {authorized ? (
      <RouterProvider router={RouteHandler[user_type]} />
    ) : (
      <RouterProvider router={RouteHandler["Public"]} />
    )}
  </React.StrictMode>
);
