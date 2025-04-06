import { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ProfileImage from "./ProfileImage";
import "./MyProfile.css";
import EditProfile from "./EditProfile/EditProfile";

const MyProfileContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  if (isEditing) {
    // Pass the user object correctly to the EditProfile component
    return <EditProfile user={user} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <Container className="profileContainer">
      <Card className="profileCard">
        <ProfileImage
          size={230}
          customStyle={{ marginBottom: "20px", marginTop: "0.5em" }}
          className="d-flex justify-content-center me-2"
        />
        <h3 className="title">My Profile</h3>
        <Row>
          <Col>
            <p className="description">Name:</p>
            <p className="description">Role:</p>
            <p className="description">Email:</p>
            <p className="description">Contact:</p>
          </Col>
          <Col>
            <p className="detail">
              {`${roleDetails.first_name || "Guest"} ${roleDetails.last_name || ""}`}
            </p>
            <p className="detail">{roleDetails.jobrole || "N/A"}</p>
            <p className="detail">{roleDetails.email || "N/A"}</p> {/* Display email */}
            <p className="detail">
              {`${roleDetails.isd || ""} ${roleDetails.mobile_number || "N/A"}`}
            </p>
          </Col>
        </Row>
        <Button
          variant="success"
          className="editProfileButton"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </Button>
      </Card>
    </Container>
  );
};

export default MyProfileContainer;
