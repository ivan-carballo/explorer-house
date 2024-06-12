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

  const buscaporprecio = (rango1,rango2) => {
    // Lógica para buscar por precio
  };

  const handlelogout = () => {
    // Lógica para el logout
  };

  return (
    <>
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
      <li><button onClick={() => buscaporprecio(70000,150000)}><FaCoins /> 70000-150000</button></li>
      <li><button onClick={() => buscaporprecio(150001,300000)}><FaCoins /> 150001-300000</button></li>
      <li><button onClick={() => buscaporprecio(300001,500000)}><FaCoins /> 300001-500000</button></li>
      <li><button onClick={() => buscaporprecio(500001,2000000)}><FaCoins /> 50001+</button></li>
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
        <li>
        <img src="src/components/cabecera/explorerhouselogo.jpg" alt="Logo" className="cabecera_icon" />
        </li>
      </ul>
      
    </header>
    <img src="src/components/cabecera/linea.jpg" alt="" className="linea"/>
    <br></br>
    <br></br>
    </>
  );
}

export default Cabecera;
