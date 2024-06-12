import { userLogin } from "../api/apiUser";
import { getCita } from "../api/apiCita.js";
import { getPropiedad } from '../api/apiPropiedad.js'
import { Navbar } from "../componentes/navbar.jsx";
import { useState } from "react";

import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import '../scss/user.scss'


function UserPanel() {
    const [listCitas, setListCitas] = useState('')




    Cita()
    async function Cita() {
        let listCita = await getCita()
        listCita = await listCita.data

        let listPropiedad = await getPropiedad()
        listPropiedad = await listPropiedad.data

        const name_ = Cookies.get('username')
        let listCitaArray = []
        let listPropiedadArray = []


        for (let i = 0; listCita.length > i; i++) {
            if (name_ == sha256(listCita[i].username)) {
                listCitaArray.push(listCita[i])

                for (let j = 0; listPropiedad.length > j; j++) {
                    if (listCita[i].propiedad == listPropiedad[j]._id) {
                        listPropiedadArray.push(listPropiedad[j])
                    }
                }
            }
        }
        

        const citasDiv = await listCitaArray.map((data) => 
            <div id='div-citas' key={data._id}>
                <p>Fecha: {data.date}</p>
                <p>Vendedor: {data.vendor}</p>
                <input type="button" value="Eliminar cita" onClick={citaDelete} />
            </div>
        )
        setListCitas(citasDiv)
    }


    async function citaDelete(e) {
        //Aqui para eliminar la cita
    }




    return (
        <>
            <Navbar />
            <div id='user-html'>
                <div id='datos'>
                    <h1>Citas solicitadas</h1>
                </div>
                <div id='citas'>
                    {listCitas}
                </div>
            </div>
        </>
    )
}



export {
    UserPanel
}