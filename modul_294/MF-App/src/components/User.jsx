// components/UserManagementPage.jsx
import { useState } from "react";

const User = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    role: "customer", // Standardrolle
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Logik zum Speichern der Benutzerdaten
    console.log("User Data Saved:", userData);
  };

  const handleCancel = () => {
    // Logik zum Abbrechen oder Zurücksetzen der Änderungen
    setUserData({
      firstName: "",
      lastName: "",
      role: "customer",
    });
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <div className="form-container">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <select name="role" value={userData.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="root">Root</option>
          </select>
        </label>
        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default User;
