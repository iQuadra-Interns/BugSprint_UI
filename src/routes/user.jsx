import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// handle navigation for user routes
const UserRouter = createBrowserRouter([
    {
      path: "/", // replace with actual path
      element: <App/>, // Replace with  actual component
      errorElement: <>Error Occurs</>, // Replace with Error Page 
    },
   //  add more routes here
  ]);
  
  export default UserRouter;