import { useState } from "react";
import CreateUser from "./CreateUser"; // Importiere die Komponente


const User = () => {
  const [role, setRole] = useState('customer');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Methode zum Ändern der ausgewählten Rolle
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Methode zum Suchen von Benutzern basierend auf der Rolle
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/documents`);
      
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
  
      const data = await response.json();
      const filteredUsers = data.filter(user => user.content.role === role);
      setUsers(filteredUsers);
      // Fehler zurücksetzen 
      setError(''); 
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch users');
    }
  };

  return (
    <div className="find-user-page">
      <div className="filter-container">
      <h2>Benutzer nach Rolle suchen</h2>
      <br />
        <label>
          Role:
          <select value={role} onChange={handleRoleChange}>
            <option value="customer">Kunde</option>
            <option value="admin">Admin</option>
            <option value="worker">Mitarbeiter</option>
          </select>
        </label>
        <button className="search-button" onClick={handleSearch}>Suchen</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="user-results">
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.content.firstName} {user.content.lastName} - {user.content.role}
              </li>
            ))}
          </ul>
        ) : (
          <p>Keine Benutzer gefunden</p>
        )}
      </div>
      <CreateUser />
    </div>
  );
};

export default User;
