import { createBrowserRouter } from "react-router-dom";

// Handle navigation for admin routes
const AdminRouter = createBrowserRouter([
  {
    path: "/", // replace with actual path
    element: <>Admin </>, // Replace with  actual component
    errorElement: <>Error Occurs</>, // Replace with Error Page
  },
  //  add more routes here
]);

export default AdminRouter;
