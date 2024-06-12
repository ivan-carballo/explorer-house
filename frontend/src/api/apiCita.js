

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
    citaCreate
  }