import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";


import "../scss/newPropiedad.scss"



function NewPropiedad() {


    async function enviarPropiedad() {

    }


    return (
        <div id='nuevaPropiedad'>
            <Navbar />
            <div id='nuevo-rotulo'>
                <h1>Añadir nueva propiedad</h1>
            </div>
            <div id='nuevo-div-form'>
                <form id='nuevo-form'>
                    <input type="text" name="" id="" placeholder='Tipo' />
                    <input type="text" name="" id="" placeholder='Ciudad' />
                    <input type="text" name="" id="" placeholder='Descripcion' />
                    <input type="number" min='0' name="" id="" placeholder='Habitaciones' />
                    <input type="number" min='0' name="" id="" placeholder='Metros' />
                    <input type="number" min='0' name="" id="" placeholder='Altura' />
                    <input type="number" min='0' name="" id="" placeholder='Precio' />
                    <input id='nuevo-button' type="button" value="Dar de alta" onClick={enviarPropiedad}/>
                </form>
            </div>
        </div>
    )
}


export {
    NewPropiedad
}