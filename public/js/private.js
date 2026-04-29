const boton_crear = document.getElementById('btnCrearProducto');
const boton_eliminar = document.getElementById('btnEliminarProducto')

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
    const desplegableUpdate = document.getElementById('modificar-artista');

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

                desplegable.append(artistOption.cloneNode(true));
                desplegableUpdate.append(artistOption);
            });

        }

    } catch (error) {
        console.log('Error al conseguir los artistas', error.message)
        desplegable.innerHTML = '<option value="" disabled selected>Error al cargar</option>';
        desplegableUpdate.innerHTML = '<option value="" disabled selected>Error al cargar</option>';
    }

}

async function cargarTiposProductos() {
    const desplegableTipos = document.getElementById("crear-tipo");
    const desplegableTiposUpdate = document.getElementById('modificar-tipo');

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

                // Clona el element, ja que un element del DOM no pot estar a dos llocs simultàneament
                desplegableTipos.append(artistOption.cloneNode(true));
                desplegableTiposUpdate.append(artistOption);
            });
        }
    } catch (error) {
        console.log("Error al conseguir los artistas", error.message);
        desplegableTipos.innerHTML = '<option value="" disabled selected>Error al cargar</option>';
        desplegableTiposUpdate.innerHTML = '<option value="" disabled selected>Error al cargar</option>';
    }
}

// Añade esta función en tu private.js
async function cargarProductosDesplegables() {
    const selectModificar = document.getElementById('modificar-id');
    const selectEliminar = document.getElementById('eliminar-id');

    try {
        // Hacemos la petición a tu ruta del backend que devuelve todos los productos
        // Nota: Asegúrate de que esta URL coincide con la ruta real en tu userRoutes.js
        const respuesta = await fetch('/api/productos'); 
        
        if (!respuesta.ok) throw new Error('Error al obtener los productos');
        
        const data = await respuesta.json();

        const productos = data.products;

        // Limpiamos los selects por si tenían datos viejos y añadimos la opción por defecto
        const opcionPorDefecto = '<option value="" disabled selected>Selecciona un producto</option>';
        selectModificar.innerHTML = opcionPorDefecto;
        selectEliminar.innerHTML = opcionPorDefecto;

        // Iteramos sobre el array de productos que nos devolvió la base de datos
        productos.forEach(producto => {
            // Creamos una nueva etiqueta <option>
            const opcion = document.createElement('option');
            
            // El 'value' será el ID real de la base de datos (lo que enviaremos al backend)
            opcion.value = producto.product_id; 
            
            // El texto visible será el nombre del producto (lo que lee el usuario)
            opcion.textContent = producto.product_name; 

            // Añadimos esta opción a ambos menús desplegables
            // Usamos cloneNode(true) porque un mismo elemento DOM no puede estar en dos sitios a la vez
            selectModificar.appendChild(opcion.cloneNode(true));
            selectEliminar.appendChild(opcion);
        });

    } catch (error) {
        console.error("Hubo un problema cargando los desplegables:", error);
        selectModificar.innerHTML = '<option value="" disabled selected>Error al cargar</option>';
        selectEliminar.innerHTML = '<option value="" disabled selected>Error al cargar</option>';
    }
}

async function crearProducto() {
    const token = localStorage.getItem("miTokenVip");

    // Captura el valor del input
    const urlImagen = document.getElementById("crear-imagen").value;

    // Crea el objeto con el formato correcto
    const nuevo_producto = {
        type: document.getElementById("crear-tipo").value,
        name: document.getElementById("crear-nombre").value,
        desc: document.getElementById("crear-desc").value,
        extra: document.getElementById("crear-extra").value,
        artist: document.getElementById("crear-artista").value,
        // AQUÍ ESTÁ EL CAMBIO:
        // Convertimos un array ['url'] en un string '["url"]'
        image: JSON.stringify([urlImagen]),
    };

    try {
        const result = await fetch("/api/productos", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify(nuevo_producto),
        });

        const data = await result.json();

        if (!result.ok) {
            throw new Error("Error en la petición");
            console.log(data);
            return;
        }

        console.log("Producto creado correctamente");
        cargarProductosDesplegables();
    } catch (error) {
        console.log("Error al crear un nuevo producto", error.message);
    }
}

async function eliminarProducto() {
    const product_id = document.getElementById("eliminar-id").value;
    const token = localStorage.getItem("miTokenVip");

    try {
        const response = await fetch(`/api/productos/delete/${product_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.ok) 
        {
            alert('Producto eliminado correctamente');
            cargarProductosDesplegables();
        }
        else
        {
            console.log('Usuario eliminado correctamente');
        }

    } catch (error) {
        console.log(error.message);
    }
}

function cargarTodo() {
    cargarArtistas();
    cargarProductosDesplegables();
    cargarTiposProductos();
}


document.addEventListener('DOMContentLoaded', cargarTodo)
boton_crear.addEventListener('click', crearProducto);
boton_eliminar.addEventListener('click', eliminarProducto);
