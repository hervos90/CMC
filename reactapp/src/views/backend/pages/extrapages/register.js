import React, { useState } from 'react';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('https://localhost:7157/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, email, password }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            // Vous pouvez traiter la réponse ici si nécessaire
            const data = await response.json();
            console.log('Réponse du serveur:', data);
        } catch (error) {
            console.error('Erreur lors de la requête:', error.message);
        }
    };

    return (
        <div>
            <label>Username:</label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;