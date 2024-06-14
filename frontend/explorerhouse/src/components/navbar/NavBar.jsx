import React, { useState } from 'react';
import './NavBar.css';
import { FaShoppingCart, FaHome, FaUser, FaUserPlus, FaBuilding, FaMapMarkerAlt, FaWarehouse, FaAddressBook, FaCoins, FaUserMinus } from 'react-icons/fa';



const NavBar = () => {
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
          <img src="src/components/navbar/explorerhouselogo.jpg" alt="Logo" className="cabecera_icon" />
        </li>
        <li>
          <button className="boton"onClick={() => handleNavigation('/')}><FaHome /> Inicio</button>
        </li>
        <li className="dropdown">
  <button onClick={toggleDropdown} className="dropdown__toggle boton">
    <FaBuilding /> Inmuebles
  </button>
  {dropdownOpen && (
    <ul className="dropdown__menu">
      <li><b><p  className="texto">Buscar por precio</p></b></li>
      <li><button onClick={() => buscaporprecio(70000,150000)}><FaCoins /> 70000-150000</button></li>
      <li><button onClick={() => buscaporprecio(150001,300000)}><FaCoins /> 150001-300000</button></li>
      <li><button onClick={() => buscaporprecio(300001,500000)}><FaCoins /> 300001-500000</button></li>
      <li><button onClick={() => buscaporprecio(500001,2000000)}><FaCoins /> 500001 +</button></li>
    </ul>
  )}
</li>
        <li>
          <button className="boton" onClick={() => handleNavigation('/login')}><FaUserPlus /> Login/Register </button>
        </li>
        <li>
          <button className="boton" onClick={() => handlelogout()}><FaUserMinus /> Logout</button>
        </li>
        <li>
        <button className="boton" onClick={() => handleNavigation('/usuario')}>
          <img src="src/components/navbar/usuario.png" alt="Usuario" className="usuario" />
          </button>
        </li>
        <li>
        <img src="src/components/navbar/explorerhouselogo.jpg" alt="Logo" className="cabecera_icon" />
        </li>
      </ul>
      
    </header>
    <img src="src/components/navbar/linea.jpg" alt="" className="linea"/>
    <br></br>
    <br></br>
    </>
  );
}

export default NavBar;
