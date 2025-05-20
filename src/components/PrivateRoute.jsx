import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../store/authActions';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "logout") {
                dispatch(logout()); // Logout in this tab too
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [dispatch]);

    if (!isAuthenticated) {
        toast.warning("Access denied. Please sign in.", { position: "top-right", autoClose: 3000 });
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
