import { Outlet, NavLink } from "react-router-dom";


const Root = () => {


    return (
        <div>
            <nav>
                <div id='div-links'>
                    <NavLink to="/" className='link'>index</NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};

export {
    Root
}