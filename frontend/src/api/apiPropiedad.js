  async function getPropiedad() {
    let propiedad = await fetch(`http://localhost:3015/propiedad`);
    propiedad = await propiedad.json();
    return (propiedad)
  }

  const createPropiedad = async(propiedadData)=>{
    const result = await fetchData("http://localhost:3015/propiedad","post",propiedadData);
    return result;
  }

    

  export {
    getPropiedad,
    createPropiedad
  }