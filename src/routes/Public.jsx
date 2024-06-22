import { createBrowserRouter } from "react-router-dom";

// handle navigation for user routes
const PublicRouter = createBrowserRouter([
    {
      path: "/", // replace with actual path
      element: <>Public User</>, // Replace with  actual component
      errorElement: <>Error Occurs</>, // Replace with Error Page 
    },
   //  add more routes here
  ]);
  
  export default PublicRouter;