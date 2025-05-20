import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";

function CreateNotificationContainer({ obj, setPopUp }) {
  const handleClose = () => {
    const notificationData = {
      notification: false,
      type: "",
      data: "",
      message: "",
    };
    setPopUp(notificationData);
  };

  // Automatically dismiss the notification after 3 seconds
  useEffect(() => {
    let timer;
    if (obj.notification) {
      timer = setTimeout(() => {
        handleClose();
      }, 4000); // 3000ms = 3 seconds
    }
    return () => {
      clearTimeout(timer); // Clean up the timeout when the component unmounts or obj changes
    };
  }, [obj.notification]);

  if (obj.notification) {
    return (
      <Alert
        variant={obj.type}
        onClose={handleClose}
        dismissible
        style={{
          position: "absolute",
          right: "30px",
          padding: "10px",
          paddingRight: "2rem",
          marginTop: "50px",
        }}
      >
        <Alert.Heading style={{ fontSize: "18px" }}>{obj?.data}</Alert.Heading>
        <p style={{ fontSize: "14px" }}>{obj.message}</p>
      </Alert>
    );
  }
  return null;
}

export default CreateNotificationContainer;
