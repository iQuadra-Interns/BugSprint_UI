import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import BSLogo from "../images/450_BS_Main-Light.png";
import profile_pic from "../images/profile_pic.png";
import { Grid, User, FileText, Settings, LogOut } from 'lucide-react'; // Import FileText icon
import { logout } from '../store/authActions';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './MyProfile.css';

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  // Extract user details dynamically
  const roleDetails =
    user?.developer_details ||
    user?.tester_details ||
    user?.admin_details ||
    {};

  const firstName = roleDetails?.first_name || "Guest";
  const lastName = roleDetails?.last_name || "";
  const userCategory = user?.usr?.user_category || "Unknown";

  return (
    <Nav className="sideBar">
      <Nav.Item className="mb-4 px-3">
        <img src={BSLogo} alt="Bugsprint Logo" className="img-fluid" />
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center mb-4 px-3">
        <img src={profile_pic} width={40} height={40} className="rounded-circle me-2" alt="Profile" />
        <div>
          <div className="fw-bold">
            {`${firstName} ${lastName}`}
          </div>
          <small className="text-muted">{userCategory}</small>
        </div>
      </Nav.Item>
      <Nav.Link href="/MyDashboard" className="d-flex align-items-center px-3 py-2">
        <Grid size={18} className="me-2" /> Dashboard
      </Nav.Link>
      {/* New Test Cases Link */}
      <Nav.Link href="/TestCases" className="d-flex align-items-center px-3 py-2">
        <FileText size={18} className="me-2" /> Test Cases
      </Nav.Link>
      <Nav.Link href="/MyProfile" className="d-flex align-items-center px-3 py-2">
        <User size={18} className="me-2" /> My Profile
      </Nav.Link>
      <Nav.Link href="/Settings" className="d-flex align-items-center px-3 py-2">
        <Settings size={18} className="me-2" /> Settings
      </Nav.Link>
      <Nav.Link onClick={handleLogout} className="d-flex align-items-center px-3 py-2">
        <LogOut size={18} className="me-2" /> Logout
      </Nav.Link>
    </Nav>
  );
}
