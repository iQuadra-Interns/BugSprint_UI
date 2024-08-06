import React from 'react';
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import BSLogo from "../images/450_BS_Main-Light.png";
import profile_pic from "../images/profile_pic.png";
import { Grid, User, Settings, LogOut } from 'lucide-react';
import '../App.css';
import './MyProfile.css'

export default function SideBar() {
  return (
    //<Nav className="flex-column bg-light h-100 py-3">
    <Nav className="sideBar">
      <Nav.Item className="mb-4 px-3">
        <img src={BSLogo} alt="Bugsprint Logo" className="img-fluid" />
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center mb-4 px-3">
        <img src={profile_pic} width={40} height={40} className="rounded-circle me-2" alt="Profile" />
        <div>
          <div className="fw-bold">Hari Krishna</div>
          <small className="text-muted">Admin</small>
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
      <Nav.Link href="#logout" className="d-flex align-items-center px-3 py-2">
        <LogOut size={18} className="me-2" /> Logout
      </Nav.Link>
    </Nav>
  );
}

// The code relies on Bootstrap's built-in active class. When a Nav.Link is clicked, Bootstrap automatically adds the 'active' class to it.