import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompraTotal = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch("https://fakestoreapi.com/carts/user/2")
      .then((res) => res.json())
      .then((data) => setCart(data[0]));
  }, []);

  useEffect(() => {
    if (cart) {
      cart.products.forEach((item) => {
        fetch(`https://fakestoreapi.com/products/${item.productId}`)
          .then((res) => res.json())
          .then((data) => {
            setProducts((prev) => ({ ...prev, [item.productId]: data }));
          });
      });
    }
  }, [cart]);

  const handleSeguirComprando = () => {
    navigate("/home");
  };

  const calculateTotal = () => {
    if (!cart || Object.keys(products).length === 0) return 0;
    return cart.products
      .reduce((total, item) => {
        const product = products[item.productId];
        return total + (product ? product.price * item.quantity : 0);
      }, 0)
      .toFixed(2);
  };

  if (!user || !cart) return <div>Cargando...</div>;

  return (
    <div style={styles.modelo}>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "800px",
          margin: "auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Shop Online</h1>
          <div>
            <span>
              Bienvenido: {user.name.firstname} {user.name.lastname}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div>
              <label style={{ marginRight: "10px" }}>Fecha</label>
              <input
                type="text"
                style={{ border: "1px solid #ccc", padding: "5px" }}
              />
            </div>
            <div>
              <label style={{ marginRight: "10px" }}>Pedido número:</label>
              <input
                type="text"
                style={{ border: "1px solid #ccc", padding: "5px" }}
              />
            </div>
          </div>
          <div>
            <label style={{ marginRight: "10px" }}>Cliente</label>
            <input
              type="text"
              value={`${user.name.firstname} ${user.name.lastname}`}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                width: "calc(100% - 70px)",
              }}
              readOnly
            />
          </div>
        </div>

        <h2
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "blue",
          }}
        >
          Relación de Productos
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Concepto
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Cantidad
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Valor
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((item, index) => {
              const product = products[item.productId];
              return (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {product ? product.title : `Producto ${item.productId}`}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    ${product ? product.price.toFixed(2) : "--"}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    $
                    {product
                      ? (product.price * item.quantity).toFixed(2)
                      : "--"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Total: ${calculateTotal()}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
            }}
            onClick={handleSeguirComprando}
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modelo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f2f5",
  },
};

export default CompraTotal;
