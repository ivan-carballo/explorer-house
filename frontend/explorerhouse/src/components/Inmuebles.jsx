import React, { useState } from 'react';
import TarjetaInmueble from './tarjetainmueble/TarjetaInmueble';
 import './Inmuebles.css'; 

const Inmuebles = () => {
  const [inmuebles, setInmuebles] = useState([
    {
      type: 'Casa',
      ciudad: 'Madrid',
      url: 'https://via.placeholder.com/300x200',
      descripcion: 'Una hermosa casa en el centro de la ciudad.',
      habitaciones: 3,
      metros: 120,
      altura: 2,
      precio: 350000,
    },
    {
      type: 'Departamento',
      ciudad: 'Barcelona',
      url: 'https://via.placeholder.com/300x200',
      descripcion: 'Departamento con vista al mar.',
      habitaciones: 2,
      metros: 80,
      altura: 10,
      precio: 450000,
    },
    // Agrega más inmuebles si es necesario
  ]);

  return (
    <div className="inmuebles-container">
      {inmuebles.map((inmueble, index) => (
        <TarjetaInmueble
          key={index}
          type={inmueble.type}
          ciudad={inmueble.ciudad}
          url={inmueble.url}
          descripcion={inmueble.descripcion}
          habitaciones={inmueble.habitaciones}
          metros={inmueble.metros}
          altura={inmueble.altura}
          precio={inmueble.precio}
        />
      ))}
    </div>
  );
};

export default Inmuebles;
