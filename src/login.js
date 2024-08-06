import React, { useState } from "react";
import './login.css'; // Importa el archivo CSS

function Login({ onLogin, onToggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    // Intentar iniciar sesión
    onLogin(username, password);
    setError("");
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <button type="submit">Login</button>
        <div className="toggle-link">
          <button type="button" onClick={onToggle}>
            Don't have an account? Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;