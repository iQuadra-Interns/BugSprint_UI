import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/authActions";
import "./EditProfile.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen"; // Import the LoadingScreen component

const EditProfile = ({ user, onCancel }) => {
  const dispatch = useDispatch();

  // Dynamically extract the correct role details
  const roleDetails =
    user?.developer_details ||
    user?.tester_details ||
    user?.admin_details ||
    {};

  const [formData, setFormData] = useState({
    first_name: roleDetails.first_name || "",
    middle_name: roleDetails.middle_name || "",
    last_name: roleDetails.last_name || "",
    mobile_number: roleDetails.mobile_number || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show the loading screen
    setError("");

    if (!user?.usr?.user_id) {
      setError("User ID is missing. Cannot update profile.");
      setIsSubmitting(false);
      return;
    }

    const API_URL = `https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/api/edit-profile/${user.usr.user_id}`;

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      dispatch(updateProfile(updatedUser));
      onCancel();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false); // Hide the loading screen
    }
  };

  return (
    <>
      {isSubmitting && <LoadingScreen />} {/* Render the loading screen conditionally */}
      <h3 className="edit-profile-title">Edit Profile</h3>
      {error && <p className="edit-profile-error">{error}</p>}
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="middle_name">Middle Name</label>
          <input
            type="text"
            id="middle_name"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
