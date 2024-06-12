import { Outlet, NavLink } from "react-router-dom";
import Cookies from 'js-cookie';

import '../scss/navbar.scss'


const Navbar = () => {

    async function logout() {
        Cookies.remove('username')
        Cookies.remove('credential')
        Cookies.remove('id')
    }


    return (
        <div>
            <nav>
                <div id='div-links'>
                    <NavLink to="/index" className='link'>Index</NavLink>
                    <NavLink to="/buscador" className='link'>Buscador</NavLink>
                    <NavLink to="/user" className='link'>Panel de usuario</NavLink>
                    <NavLink to="/" className='link' onClick={logout}>Logout</NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};



export {
    Navbar
}