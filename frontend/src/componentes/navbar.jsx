import { Outlet, NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import { FaHome, FaUser, FaBuilding, FaMapMarkerAlt, FaWarehouse, FaAddressBook, FaUserMinus, FaUserAltSlash, FaPlusCircle } from 'react-icons/fa';


import '../scss/navbar.scss'


const Navbar = () => {
    const role = Cookies.get('role')

    async function logout() {
        Cookies.remove('username')
        Cookies.remove('credential')
        Cookies.remove('id')
        Cookies.remove('role')
    }


    return (
        <div>
            <nav>
                <div id='div-links'>
                    <img id='logo-navbar' src="../../public/explorerhouselogo.jpg" />
                    <NavLink to="/index" className='link'><FaHome /> Index</NavLink>
                    <NavLink to="/buscador" className='link'><FaBuilding /> Buscador</NavLink>
                    <NavLink to="/user" className='link'><FaUser /> Panel de usuario</NavLink>
                    {role == 'admin' ? <NavLink to="/new" className='link'><FaPlusCircle /> Nueva propiedad</NavLink> : <></>}
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