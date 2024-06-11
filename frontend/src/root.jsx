import { Outlet, NavLink } from "react-router-dom";


const Root = () => {


    return (
        <div>
            <nav>
                <div id='div-links'>
                    <NavLink to="/" className='link'>index</NavLink>
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
    Root
}