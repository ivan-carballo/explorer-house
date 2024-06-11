import { Outlet, NavLink } from "react-router-dom";

import '../scss/navbar.scss'


const Navbar = () => {


    return (
        <div>
            <nav>
                <div id='div-links'>
                    <NavLink to="/index" className='link'>Index</NavLink>
                    <NavLink to="/buscador" className='link'>Buscador</NavLink>
                    <NavLink to="/cita" className='link'>Solicitar cita</NavLink>
                    <NavLink to="/user" className='link'>Panel de usuario</NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};



export {
    Navbar
}