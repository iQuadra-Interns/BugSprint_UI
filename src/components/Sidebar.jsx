import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import BSLogo from "../images/450_BS_Main-Light.png";
import profile_pic from "../images/profile_pic.png";
import { Grid, User, Settings, LogOut } from 'lucide-react';
import { logout } from '../store/authActions';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './MyProfile.css';

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/sign-in'); // Redirect to sign-in page after logout
  };

  return (
    <Nav className="sideBar">
      <Nav.Item className="mb-4 px-3">
        <img src={BSLogo} alt="Bugsprint Logo" className="img-fluid" />
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center mb-4 px-3">
        <img src={profile_pic} width={40} height={40} className="rounded-circle me-2" alt="Profile" />
        <div>
          <div className="fw-bold">
            {user?.developer_details.first_name + " " + user?.developer_details.last_name}
          </div>
          <small className="text-muted">{user?.usr.user_category}</small> {/* Assuming this contains the role */}
        </div>
      </Nav.Item>
      <Nav.Link href="/MyDashboard" className="d-flex align-items-center px-3 py-2">
        <Grid size={18} className="me-2" /> Dashboard
      </Nav.Link>
      <Nav.Link href="/MyProfile" className="d-flex align-items-center px-3 py-2">
        <User size={18} className="me-2" /> My Profile
      </Nav.Link>
      <Nav.Link href="#settings" className="d-flex align-items-center px-3 py-2">
        <Settings size={18} className="me-2" /> Settings
      </Nav.Link>
      <Nav.Link onClick={handleLogout} className="d-flex align-items-center px-3 py-2">
        <LogOut size={18} className="me-2" /> Logout
      </Nav.Link>
    </Nav>
  );
}
