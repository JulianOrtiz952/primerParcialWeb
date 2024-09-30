import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Home from "./Home";
import Carrito from "./Carrito";
import CompraTotal from "./CompraTotal"; // Importar CompraTotal

const App = () => {
  const [carrito, setCarrito] = useState([]); // Estado del carrito

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<Home carrito={carrito} setCarrito={setCarrito} />}
        />
        <Route path="/carrito" element={<Carrito />} />{" "}
        {/* Página del carrito */}
        <Route path="/compraTotal" element={<CompraTotal />} />{" "}
        {/* Página de compra total */}
      </Routes>
    </Router>
  );
};

export default App;
