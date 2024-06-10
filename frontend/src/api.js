async function getPropiedad() {
    let propiedad = await fetch(`http://localhost:3015/propiedad`);
    propiedad = await propiedad.json();
    return (propiedad)
  }


  



  export {
    getPropiedad
  }