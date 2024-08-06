import React, { useState } from "react";
import './register.css'; // Importa el archivo CSS

function Register({ onRegister, onToggle }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !surname || !username || !password) {
      setError("All fields are required.");
      return;
    }
    // Registrar usuario
    onRegister(name, surname, username, password);
    setError("");
  };

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="message">{error}</div>}
        <button type="submit">Register</button>
        <div className="toggle-link">
          <button type="button" onClick={onToggle}>
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
