import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar

const Home = ({ carrito, setCarrito }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(""); // Categoría seleccionada
  const navigate = useNavigate(); // Hook para redireccionar

  // Fetch de productos al cargar el componente
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Inicialmente mostrar todos los productos
      });
  }, []);

  // Filtrar productos por categoría
  const handleCategoryChange = (cat) => {
    setCategory(cat); // Cambiar categoría seleccionada
    if (cat === "") {
      setFilteredProducts(products); // Mostrar todos si no hay categoría
    } else {
      const filtered = products.filter((product) => product.category === cat);
      setFilteredProducts(filtered);
    }
  };

  // Filtrar por término de búsqueda (dentro de la categoría seleccionada)
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === "" || product.category === category) // Respetar categoría
    );
    setFilteredProducts(filtered);
  };

  // Función para añadir producto al carrito
  const addToCart = (product) => {
    setCarrito((prevCarrito) => [...prevCarrito, product]); // Agrega al estado del carrito
  };

  // Redirección al carrito
  const goToCart = () => {
    navigate("/carrito"); // Redirige a la página del carrito
  };

  // Función para salir (volver al login)
  const handleLogout = () => {
    navigate("/login"); // Redirige al login
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Shop Online</h1>
        <div style={styles.searchSection}>
          <input
            type="text"
            placeholder="Filtro de búsqueda"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            Buscar
          </button>
        </div>
        <div style={styles.cartSection}>
          <span style={styles.cartIcon} onClick={goToCart}>
            🛒 Carrito ({carrito.length})
          </span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Salir
          </button>
        </div>
      </header>

      <nav style={styles.categoryNav}>
        <button
          onClick={() => handleCategoryChange("")}
          style={styles.categoryButton}
        >
          Todos
        </button>
        <button
          onClick={() => handleCategoryChange("electronics")}
          style={styles.categoryButton}
        >
          Electronics
        </button>
        <button
          onClick={() => handleCategoryChange("jewelery")}
          style={styles.categoryButton}
        >
          Jewelery
        </button>
        <button
          onClick={() => handleCategoryChange("men's clothing")}
          style={styles.categoryButton}
        >
          Men's clothing
        </button>
        <button
          onClick={() => handleCategoryChange("women's clothing")}
          style={styles.categoryButton}
        >
          Women's clothing
        </button>
      </nav>

      <h2 style={styles.productTitle}>Productos</h2>

      <div style={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              style={styles.productImage}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)} style={styles.addButton}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos en línea para mantener el diseño limpio
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
  },
  searchSection: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    padding: "5px",
    fontSize: "16px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  searchButton: {
    padding: "6px 12px",
    backgroundColor: "#4A47A3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cartSection: {
    display: "flex",
    alignItems: "center",
  },
  cartIcon: {
    fontSize: "24px",
    marginRight: "20px",
    cursor: "pointer", // Ahora es clickable
  },
  logoutButton: {
    padding: "6px 12px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  categoryNav: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  categoryButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  productTitle: {
    textAlign: "center",
    marginBottom: "20px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  productCard: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
  },
  productImage: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  addButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#4A47A3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
