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

  const  buscaporprecio = (precio) => {
    
  };

  const  handlelogout = (precio) => {
    
  };

  
 

  return (
    <header className="cabecera">

        <ul className="cabecera__nav">

        <img src="src/components/cabecera/explorerhouselogo.jpg" className="cabecera__left" alt="Logo" className="cabecera_icon" />

          <li>
            <button onClick={() => handleNavigation('/')}><FaHome /> Inicio</button>
          </li>
          <li className="dropdown">
            <button onClick={toggleDropdown} className="dropdown__toggle">
              <FaBuilding /> Inmuebles
            </button>
            {dropdownOpen && (
              <ul className="dropdown__menu">
                <li><button onClick={() => buscaporprecio('100000')}><FaCoins/> 100000</button></li>
                <li><button onClick={() => buscaporprecio('150000')}><FaCoins /> 150000</button></li>
                <li><button onClick={() => buscaporprecio('300000')}><FaCoins /> 300000</button></li>
                <li><button onClick={() => buscaporprecio('500000')}><FaCoins /> 500000'</button></li>
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
          <img src="src/components/cabecera/usuario.png" alt="Logo" className="usuario" />
          </li>
        </ul>

    </header>
  );
}

export default Cabecera;