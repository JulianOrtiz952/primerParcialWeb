import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/menu">Menú</Link>
        </li>
        <li>
          <Link to="/lista">Lista</Link>
        </li>
        <li>
          <Link to="/opciones">Opciones</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
