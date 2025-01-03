import React, { useState } from 'react';
import './EditProfile.css';
import axios from 'axios';

const EditProfile = ({ user, userId, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    middle_name: user?.middle_name || '',
    last_name: user?.last_name || '',
    mobile_number: user?.mobile_number || '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log userId and formData for debugging
    console.log('User ID in EditProfile:', userId);
    console.log('Form Data:', formData);

    if (!userId) {
      console.error('User ID is missing');
      setMessage('Error: User ID is not available.');
      return;
    }

    const apiUrl = `https://xjhkkap5tmpwr3yjiw7nvadwra0jyiav.lambda-url.us-east-1.on.aws/api/edit-profile/${userId}`;

    try {
      const response = await axios.put(apiUrl, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Profile updated successfully!');
      onUpdate(response.data); // Pass updated user data to the parent
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="middle_name">Middle Name:</label>
          <input
            type="text"
            id="middle_name"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Contact:</label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EditProfile;
