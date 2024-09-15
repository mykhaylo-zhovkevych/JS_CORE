import { useState } from 'react';

function CreateUser() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        role: 'customer',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreateUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        role: userData.role,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Error creating user');
            }

            const data = await response.json();
            setSuccess(`Benutzer ${data.content.firstName} ${data.content.lastName} erfolgreich erstellt`);
            setUserData({ firstName: '', lastName: '', role: 'customer' }); 
        } catch (error) {
            console.error('Error:', error);
            setError('Fehler beim Erstellen des Benutzers');
        }
    };

    return (
        <div className="create-user">
            <h2>Benutzer erstellen</h2>
            <br />
            <input
                type="text"
                placeholder="Geben Sie den Vorname"
                value={userData.firstName}
                onChange={(e) => setUserData((prev) => ({ ...prev, firstName: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Geben Sie den Nachname"
                value={userData.lastName}
                onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))}
            />
            <select
                value={userData.role}
                onChange={(e) => setUserData((prev) => ({ ...prev, role: e.target.value }))}
            >
                <option value="customer">Kunde</option>
                <option value="admin">Admin</option>
                <option value="worker">Mitarbeiter</option>
            </select>
            <button className="create-button" onClick={handleCreateUser}>Benutzer erstellen</button>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
}

export default CreateUser;
