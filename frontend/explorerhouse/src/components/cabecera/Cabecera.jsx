import React, { useState } from 'react';
import './Cabecera.css';
import { FaShoppingCart, FaHome, FaUser, FaUserPlus, FaBuilding, FaMapMarkerAlt, FaWarehouse, FaAddressBook, FaCoins, FaUserMinus } from 'react-icons/fa';

const Cabecera = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (url) => {
    window.location.href = url;
  };

  const buscaporprecio = (precio) => {
    // Lógica para buscar por precio
  };

  const handlelogout = () => {
    // Lógica para el logout
  };

  return (
    <header className="cabecera">
      <ul className="cabecera__nav">
        <li className="cabecera__left">
          <img src="src/components/cabecera/explorerhouselogo.jpg" alt="Logo" className="cabecera_icon" />
        </li>
        <li>
          <button onClick={() => handleNavigation('/')}><FaHome /> Inicio</button>
        </li>
        <li className="dropdown">
  <button onClick={toggleDropdown} className="dropdown__toggle">
    <FaBuilding /> Inmuebles
  </button>
  {dropdownOpen && (
    <ul className="dropdown__menu">
      <li><button onClick={() => buscaporprecio('100000')}><FaCoins /> 100000</button></li>
      <li><button onClick={() => buscaporprecio('150000')}><FaCoins /> 150000</button></li>
      <li><button onClick={() => buscaporprecio('300000')}><FaCoins /> 300000</button></li>
      <li><button onClick={() => buscaporprecio('500000')}><FaCoins /> 500000</button></li>
    </ul>
  )}
</li>
        <li>
          <button onClick={() => handleNavigation('/login')}><FaUserPlus /> Login/Register </button>
        </li>
        <li>
          <button onClick={() => handlelogout()}><FaUserMinus /> Logout</button>
        </li>
        <li>
        <button onClick={() => handleNavigation('/usuario')}>
          <img src="src/components/cabecera/usuario.png" alt="Usuario" className="usuario" />
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Cabecera;
