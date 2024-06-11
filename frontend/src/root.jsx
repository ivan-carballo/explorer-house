import { useState, useEffect } from 'react';

import './scss/login.scss'


const Root = () => {
    const [login, setLogin] = useState('login')



    return (
        <div>
            <div id='login-header'>
                <div id='login-center'>
                    <h1>Bienvenido a <i>Explorer House</i></h1>
                    <p>Plataforma especializada en la intermediación de operaciones de compra y venta de propiedades inmobiliarias, donde garantizamos el contacto directo con los legítimos propietarios. Además, ofrecemos la posibilidad de gestionar citas personalizadas con los propietarios para que puedan mostrar personalmente la propiedad a los interesados.</p>
                    <p>Para acceder a nuestra plataforma, le invitamos a crear una cuenta de usuario que nos permitirá contar con sus datos y ofrecerle una atención más personalizada. Si ya dispone de una cuenta, simplemente inicie sesión para explorar nuestra extensa selección de propiedades inmobiliarias disponibles.</p>
                </div>
            </div>

            <div id='login-html'>
                <div id='login-cuadro-inicio'>
                    <form id='login-inicio'>
                        <h2>Iniciar sesion</h2>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <input id='login-submit' type="submit" value="Iniciar sesion" />
                    </form>
                </div>
                <div id='login-cuadro-nuevo'>
                    <form id='login-nuevo'>
                        <h2>Crear nuevo usuario</h2>
                        <input type="text" placeholder='Username' />
                        <input type="password" name="Password" placeholder='Password' />
                        <input type="password" name="RepeatPassword" placeholder='Repeat Password' />
                        <input id='login-submit' type="submit" value="Crear usuario" />
                    </form>
                </div>
            </div>
        </div>
    )
};

export {
    Root
}