import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie'
import { sha256 } from 'js-sha256'
import { FaHome, FaUser, FaBuilding, FaMapMarkerAlt, FaWarehouse, FaAddressBook, FaUserMinus, FaUserAltSlash, FaPlusCircle, FaSearch } from 'react-icons/fa';


import '../scss/navbar.scss'
import { useState } from "react";

import { getCita } from "../api/apiCita"


const Navbar = () => {
    const [aviso, setAviso] = useState('')
    const [navClass, setNavClass] = useState('link-admin')
    const [navEmergente, setNavEmergente] = useState('')

    const role = Cookies.get('role')

    async function logout() {
        Cookies.remove('username')
        Cookies.remove('credential')
        Cookies.remove('id')
        Cookies.remove('role')
    }

    revisarAviso()
    async function revisarAviso() {
        let allCitas = await getCita()
        allCitas = await allCitas.data

        let arrayFiltrado = allCitas.filter((citas) => sha256(citas.vendor) == Cookies.get('username'));
        arrayFiltrado = arrayFiltrado.filter((citas2) => citas2.state == 'Solicitud pendiente de verificar')

        if (arrayFiltrado.length > 0) {
            setAviso('nav-aviso') 
            setNavClass('')
            setNavEmergente(`Tiene ${arrayFiltrado.length} nuevas solicitudes de citas`)
        } else {
            setAviso('') 
            setNavClass('link-admin');
            setNavEmergente('')
        } 
    }

    setInterval(() => {
        revisarAviso()
    }, 15000);


    return (
        <div id='navbar-global'>
            <nav>
                <div id='div-links'>
                    <img id='logo-navbar' src="../../public/explorerhouselogo.jpg" />
                    <NavLink to="/index" className='link'><FaHome /> Index</NavLink>
                    <NavLink to="/buscador" className='link'><FaSearch /> Buscador</NavLink>
                    <NavLink to="/user" className='link'><FaUser /> Panel de usuario</NavLink>
                    {role == 'admin' ? <NavLink to="/new" className={navClass} id={aviso} title={navEmergente}><FaBuilding /> Propiedades</NavLink> : <></>}
                    <NavLink to="/" className='link' onClick={logout}><FaUserAltSlash /> Logout</NavLink>
                    <img id='logo-navbar' src="../../public/explorerhouselogo.jpg" />
                </div>
            </nav>
            <Outlet />
        </div>
    )
};



export {
    Navbar
}