import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import BSLogo from "../images/450_BS_Main-Light.png";
import profile_pic from "../images/profile_pic.png";
import { Grid, User, FileText, Settings, LogOut, Menu, X, PackagePlusIcon} from 'lucide-react'; // Added Menu and X icons
import { logout } from '../store/authActions';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './MyProfile.css';

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar on mobile

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  const toggleSidebar = () => {
    const next = !isOpen;
    setIsOpen(next);
    try {
      if (next) document.body.classList.add('sidebar-open');
      else document.body.classList.remove('sidebar-open');
    } catch (e) {
      // ignore (server-side rendering or restricted env)
    }
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
  const isAdmin = userCategory === "ADM";

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <Nav className={`sideBar ${isOpen ? 'open' : ''}`}>
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
        <Nav.Link
          href="/MyDashboard"
          className="d-flex align-items-center px-3 py-2"
          onClick={() => { setIsOpen(false); try { document.body.classList.remove('sidebar-open'); } catch(e){} }}
        >
          <Grid size={18} className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link
          href="/TestCases"
          className="d-flex align-items-center px-3 py-2"
          onClick={() => { setIsOpen(false); try { document.body.classList.remove('sidebar-open'); } catch(e){} }}
        >
          <FileText size={18} className="me-2" /> Test Cases
        </Nav.Link>
        <Nav.Link
          href="/MyProfile"
          className="d-flex align-items-center px-3 py-2"
          onClick={() => { setIsOpen(false); try { document.body.classList.remove('sidebar-open'); } catch(e){} }}
        >
          <User size={18} className="me-2" /> My Profile
        </Nav.Link>
        {/* Manage Constraints - Only for Admins */}
        {isAdmin && (
          <Nav.Link
            href="/ManageConstraints"
            className="d-flex align-items-center px-3 py-2"
            onClick={() => { setIsOpen(false); try { document.body.classList.remove('sidebar-open'); } catch(e){} }}
          >
            <PackagePlusIcon size={18} className="me-2" /> Manage Constraints
          </Nav.Link>
        )}
        <Nav.Link
          href="/Settings"
          className="d-flex align-items-center px-3 py-2"
          onClick={() => setIsOpen(false)}
        >
          <Settings size={18} className="me-2" /> Settings
        </Nav.Link>
        <Nav.Link
          onClick={() => {
              handleLogout();
              setIsOpen(false);
              try { document.body.classList.remove('sidebar-open'); } catch(e){}
            }}
          className="d-flex align-items-center px-3 py-2"
        >
          <LogOut size={18} className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </>
  );
}