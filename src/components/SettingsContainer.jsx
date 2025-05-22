import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container, Button } from "react-bootstrap";
import "./Settings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

const SettingsContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const roleDetails =
    user?.developer_details ||
    user?.tester_details ||
    user?.admin_details ||
    {};

  const userInfo = {
    user_id: user.usr.user_id,
    user_category: user.usr.user_category,
    user_cat_id: user.usr.user_cat_id,
  };

  const [formData, setFormData] = useState({
    userid: userInfo,
    email: roleDetails.email,
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const resetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show the loading screen

    // validate new password and confirm password field
    if (formData.new_password != formData.confirm_new_password) {
        toast.error("Make sure the new password and confirm password fields match");
        return;
    }


    const API_URL = `https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/api/common/reset-password`;
    

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      

      const responseFromAPI = await response.json();
      if (responseFromAPI.status.status) {
        toast.success("Your password was reset successfully");
        return;
      } else {
        toast.error("Password reset failed. " + responseFromAPI.status.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error occured. Please try again.");
    }
  };

  return (
    <Container className="settingsContainer">
      <h1 className="settingsTitle">Settings</h1>
      <ToastContainer />

      <div style={{ marginLeft: "10vh" }}>
        <h3 className="reset-password-title">Reset Password</h3>

        <form onSubmit={resetPassword} className="no-class-yet">
          <div className="spacer">
            <label htmlFor="old_password">Old Password</label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              value={formData.old_password}
              onChange={handleInputChange}
            />
          </div>
          <div className="spacer">
            <label htmlFor="new_password">New Password</label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              value={formData.new_password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="spacer">
            <label htmlFor="confirm_new_password">Confirm New Password</label>
            <input
              type="password"
              id="confirm_new_password"
              name="confirm_new_password"
              value={formData.confirm_new_password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <button type="submit" className="save-button">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SettingsContainer;