import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/authActions";
import { Form, Button } from "react-bootstrap";

const EditProfile = ({ user, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: user?.developer_details?.first_name || "",
    middle_name: user?.developer_details?.middle_name || "",
    last_name: user?.developer_details?.last_name || "",
    mobile_number: user?.developer_details?.mobile_number || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Check if user_id exists before making the API call
    if (!user?.usr?.user_id) {
      setError("User ID is missing. Cannot update profile.");
      setIsSubmitting(false);  // Ensure the button stops spinning
      return;
    }

    // Construct the API URL with the valid user_id
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

      // Dispatch Redux action to update profile
      dispatch(updateProfile(updatedUser));

      // Close the form on success
      onCancel();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>
      {error && <p className="text-danger">{error}</p>}
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formMiddleName">
        <Form.Label>Middle Name</Form.Label>
        <Form.Control
          type="text"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formMobileNumber">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="text"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Button variant="success" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
      <Button variant="secondary" onClick={onCancel} className="ml-2">
        Cancel
      </Button>
    </Form>
  );
};

export default EditProfile;
