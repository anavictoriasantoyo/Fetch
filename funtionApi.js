/* console.log("JS07 Fetch API");

const getUsers = (page = 1) => {
    const url = `https://reqres.in/api/users?page=${page}` ;

    fetch(url)
        .then( response=> response.json())
        .then( users => {

            for ( let user of users.data)
              document.getElementById('data').innerHTML += 
              `<tr>
              <td id="id">${user.id}</td>
                <td id="firstName">${user.first_name}</td>
                <td id="lastName">${user.last_name}</td>
                <td id="email">${user.email}</td>
                <td><img id="avatar" src="${user.avatar}"></td>
                </tr>`

        })
        let storedData = JSON.parse(localStorage.getItem("data"));
        if (storedData && storedData.expiration > Date.now()) {
          console.log(storedData.data);
      } else {
          // se realiza una nueva solicitus, para recuperar datos
         // fetch("https://reqres.in/api/users?delay=3")
              .then(response => response.json())
              .then(data => {
                  let expirationTime = Date.now() + 60000;
                  localStorage.setItem("data", JSON.stringify({ data: data, expiration: expirationTime }));
              });
              }
            } */
            const getUsers = (url = "https://reqres.in/api/users?delay=3") => {
              let caducidadFecha = localStorage.getItem("fecha-termino");
                  if (Object.is(null, caducidadFecha) || (new Date().getTime() > caducidadFecha)) {
              
                      fetch(url)
                          .then(response => { return response.json() })
                          .then(users => {
                              localStorage.setItem("savedUsers", JSON.stringify(users.data));
                              localStorage.setItem("fecha-termino", (new Date().getTime()) + 60000);
                              imprimirDatos();
                          })
              
                          .catch(error => {
                              console.log(error);
                          })
                  }
                  else {
                      imprimirDatos();
                  }
              }
            function imprimirDatos(){ 
                const users = JSON.parse(localStorage.getItem("savedUsers"));
                console.log(users)
                for (let index = 0; index < users.length; index++) {
                  users[index].avatar
                
                document.getElementById('data').innerHTML += 
                `<tr>
                <td id="id">${users[index].id}</td>
                  <td id="firstName">${users[index].first_name}</td>
                  <td id="lastName">${users[index].last_name}</td>
                  <td id="email">${users[index].email}</td>
                  <td><img id="avatar" src="${users[index].avatar}"></td>
                  </tr>`
              }
              }
