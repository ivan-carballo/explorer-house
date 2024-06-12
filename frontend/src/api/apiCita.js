async function getCita() {
  let cita = await fetch(`http://localhost:3015/cita`);
  cita = await cita.json();
  return (cita)
}



async function citaCreate(data) {
    fetch('http://localhost:3015/cita', data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
        //console.log(update);
        }).catch(e => {
        //console.log(e);
        });
  }




  export {
    getCita,
    citaCreate
  }