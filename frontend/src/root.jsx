import { useState, useEffect } from 'react';
import { sha256 } from "./functions/sha256"
import { userLogin, userCreate } from './api/apiUser';

import './scss/login.scss'


const Root = () => {
    const [aviso, setAviso] = useState('')



    async function login(e) {
        setAviso('')
        const username = e.target.form[0].value
        const password = sha256(e.target.form[1].value)

        let userList = await userLogin()
        userList = await userList.data

        for (let i = 0; userList.length > i; i++) {
            if(userList[i].username == username /* && userList[i].password == password */) {
                setAviso('lkjalkjksad')
            } else {
                setAviso('Su usuario o contraseña no coinciden')
            }
        }
    }



    async function create(e) {
        setAviso('')
        const username = e.target.form[0].value
        const password = sha256(e.target.form[1].value)
        const repeatPassword = sha256(e.target.form[2].value)

        let userList = await userLogin()
        userList = await userList.data

        let userUser = false;
        for (let i = 0; userList.length > i; i++) {
            if(userList[i].username == username) {
                userUser = true;
            }
        }

        if (username.length < 1 || password.lenght < 1 || repeatPassword < 1) {
            setAviso('Debe rellenar todos los campos para poder crear un nuevo usuario')
        } else if (userUser) {
            setAviso('El username elegido ya existe, debe elegir otro')
        } else if (password != repeatPassword) {
            setAviso('Las contraseñas elegidas no coinciden entre ellas')
        } else {
            const userArrayNew = {'username':username, 'password':password, 'role':'user'}

            const data = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(userArrayNew),
                };

            const userCrear = await userCreate(data)
        }
    }






    return (
        <div>
            <div id='login-header'>
                <div id='login-center'>
                    <h1>Bienvenido a <i>Explorer House</i></h1>
                    <p>Plataforma especializada en la intermediación de operaciones de compra y venta de propiedades inmobiliarias, donde garantizamos el contacto directo con los legítimos propietarios. Además, ofrecemos la posibilidad de gestionar citas personalizadas con los propietarios para que puedan mostrar personalmente la propiedad a los interesados.</p>
                    <p>Para acceder a nuestra plataforma, le invitamos a crear una cuenta de usuario que nos permitirá contar con sus datos y ofrecerle una atención más personalizada. Si ya dispone de una cuenta, simplemente inicie sesión para explorar nuestra extensa selección de propiedades inmobiliarias disponibles.</p>
                    <p id='aviso'>{aviso}</p>
                </div>
            </div>

            <div id='login-html'>
                <div id='login-cuadro-inicio'>
                    <form id='login-inicio'>
                        <h2>Iniciar sesion</h2>
                        <input type="text" placeholder='Username' />
                        <input type="password" placeholder='Password' />
                        <input id='login-submit' type="button" value="Iniciar sesion" onClick={login} />
                    </form>
                </div>
                <div id='login-cuadro-nuevo'>
                    <form id='login-nuevo'>
                        <h2>Crear nuevo usuario</h2>
                        <input type="text" placeholder='Username' />
                        <input type="password" name="Password" placeholder='Password' />
                        <input type="password" name="RepeatPassword" placeholder='Repeat Password' />
                        <input id='login-submit' type="button" value="Crear usuario" onClick={create} />
                    </form>
                </div>
            </div>
        </div>
    )
};

export {
    Root
}