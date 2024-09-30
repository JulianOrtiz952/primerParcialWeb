import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const [usuario, setUsuario] = useState(null); // Estado para guardar la información del usuario
  const [carrito, setCarrito] = useState([]); // Estado para guardar los productos del carrito
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Obtener la información del usuario
  useEffect(() => {
    fetch("https://fakestoreapi.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        console.log("Usuario:", data);
        setUsuario(data); // Guardar la información del usuario en el estado
      })
      .catch((error) => console.error("Error obteniendo el usuario:", error));
  }, []);

  // Obtener los productos del carrito
  useEffect(() => {
    fetch("https://fakestoreapi.com/carts/5")
      .then((res) => res.json())
      .then((data) => {
        console.log("Carrito:", data);
        setCarrito(data.products); // Guardar los productos del carrito en el estado
      })
      .catch((error) => console.error("Error obteniendo el carrito:", error));
  }, []);

  // Función para redirigir a la página de CompraTotal
  const handleCompraTotal = () => {
    navigate("/compraTotal");
  };

  return (
    <div style={styles.modelo}>
      <div style={styles.container}>
        <h1>Carrito de Compras</h1>

        {/* Mostrar la información del usuario */}
        {usuario && (
          <div style={styles.userInfo}>
            <h2>Usuario: {usuario.username}</h2>
            <p>Email: {usuario.email}</p>
            <p>
              Dirección: {usuario.address.street}, {usuario.address.city}
            </p>
          </div>
        )}

        {/* Mostrar los productos del carrito */}
        <div style={styles.productList}>
          {carrito.length > 0 ? (
            carrito.map((producto, index) => (
              <div key={index} style={styles.card}>
                <h3>Producto ID: {producto.productId}</h3>
                <p>Cantidad: {producto.quantity}</p>
              </div>
            ))
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>

        {/* Botón para ir a la página de CompraTotal */}
        <button onClick={handleCompraTotal} style={styles.compraButton}>
          Ir a la Compra Total
        </button>
      </div>
    </div>
  );
};

// Estilos para el carrito
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
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  userInfo: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  productList: {
    display: "flex", // Mostrar las tarjetas en fila
    flexWrap: "wrap", // Permitir que las tarjetas se envuelvan si el espacio no es suficiente
    justifyContent: "center", // Centrar las tarjetas
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "15px",
    margin: "10px",
    width: "200px", // Ancho de cada tarjeta
    textAlign: "left",
  },
  compraButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Carrito;
