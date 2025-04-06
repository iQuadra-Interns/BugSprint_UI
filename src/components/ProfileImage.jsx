import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProfileImage = ({ size = 40, customStyle = {} , className=""}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profilePic = useSelector((state) => state.auth.profile_pic);
  const [image, setImage] = useState(profilePic || null);

useEffect(() => {
    setImage(profilePic);
}, [profilePic]);

  const roleDetails =
    user?.developer_details ||
    user?.tester_details ||
    user?.admin_details ||
    {};

  const firstName = roleDetails?.first_name || "G";
  const lastName = roleDetails?.last_name || "U";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        dispatch({ type: 'SET_PROFILE_IMAGE', payload: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const sharedStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    objectFit: "cover",
    ...customStyle,
  };

  const initialsStyle = {
    ...sharedStyle,
    border: "2px solid #e2e3e5", 
    color:"#212428", 
    backgroundColor:"#c3ccd6",
    fontSize: `${size * 0.4}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className={className} >
    <label htmlFor={`fileInput-${size}`} style={{ cursor: 'pointer' }}>
      {image ? (
        <img src={image} alt="Profile" style={sharedStyle} />
      ) : (
        <div style={initialsStyle}>{initials}</div>
      )}
    </label>
    <input
      type="file"
      id={`fileInput-${size}`}
      accept="image/*"
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
  </div>
  );
};

export default ProfileImage;
