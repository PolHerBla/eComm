const token = localStorage.getItem('miTokenVip');

const boton_crear = document.getElementById('btnCrearProducto');

async function verificarAcceso() {
    const token = localStorage.getItem("miTokenVip");

    if (!token) {
        window.location.href = "/html/login.html";
        return;
    }

    try {
        const response = await fetch('/api/verify-session', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Token invalido o caducado');
            window.location.href = '/html/login.html';
            localStorage.removeItem('miTokenVip');
        } else {
            console.log('Acceso concedido')
        }

    } catch (error) {
        console.log('Error al acceder a la zona de gestión', error)
    }
}

document.addEventListener('DOMContentLoaded', verificarAcceso);

async function cargarArtistas() {
    const desplegable = document.getElementById('crear-artista');

    try {
        const response = await fetch('/api/artists', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!response.ok) {
            console.log('Error al fetch de los artistas')
        } else {

            const data = await response.json();

            const artistas = data.artists;

            artistas.forEach((artist) => {
              const artistOption = document.createElement("option");
              artistOption.value = artist.artist_id;
              artistOption.innerHTML = artist.artist_name;

              desplegable.append(artistOption);
            });

        }

    } catch (error) {
        console.log('Error al conseguir los artistas', error.message)
    }

}

async function cargarTiposProductos() {
    const desplegableTipos = document.getElementById("crear-tipo");

    try {
      const response = await fetch("/api/product-types", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      });

      if (!response.ok) {
        console.log("Error al fetch de los tipos");
      } else {
        const data = await response.json();

        const tiposProductos = data.productTypes;

        tiposProductos.forEach((tipo) => {
          const artistOption = document.createElement("option");
          artistOption.value = tipo.type_id;
          artistOption.innerHTML = tipo.type_name;

          desplegableTipos.append(artistOption);
        });
      }
    } catch (error) {
      console.log("Error al conseguir los artistas", error.message);
    }
}

async function crearProducto() {

    const nuevo_producto = {
        type: document.getElementById('crear-tipo').value,
        name: document.getElementById('crear-nombre').value,
        desc: document.getElementById('crear-desc').value,
        extra: document.getElementById('crear-extra').value,
        artist: document.getElementById('crear-artista').value,
        image: document.getElementById('crear-imagen').value
    }

    try {
        const result = await fetch('/api/productos', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(nuevo_producto)
        });

        const data = await result.json();

        if (!result.ok) {
            throw new Error('Error en la petición');
            console.log(data)
            return;
        }

        console.log('Usuario creado correctamente');

    } catch (error) {
        console.log('Error al crear un nuevo producto', error.message);
    }

}


document.addEventListener('DOMContentLoaded', cargarTiposProductos)
document.addEventListener('DOMContentLoaded', cargarArtistas)
boton_crear.addEventListener('click', crearProducto);
