import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar errores de autenticación
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Petición POST a la API para el login
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // Si la autenticación es exitosa, `data` debe contener el token
      if (response.ok) {
        console.log("Login successful", data);
        setError(""); // Limpiar error en caso de éxito
        // Guardar token o hacer cualquier otra acción necesaria
        // Redirigir a la página principal (Home)
        navigate("/home");
      } else {
        setError("Usuario o contraseña incorrectos"); // Mostrar mensaje de error
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Hubo un problema al realizar el login"); // Error genérico
    }
  };

  return (
    <div style={styles.modelo}>
      <div style={styles.container}>
        <h1>Shop Online</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
        <button onClick={() => navigate("/register")} style={styles.link}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

// Estilos en línea para mantener el diseño similar a tu captura
const styles = {
  modelo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4A47A3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  link: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#4A47A3",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Login;
