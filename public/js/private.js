const boton_crear = document.getElementById("btnCrearProducto");
const boton_eliminar = document.getElementById("btnEliminarProducto");
const boton_actualizar = document.getElementById("btnModificarProducto");

async function verificarAcceso() {
  const token = localStorage.getItem("miTokenVip");

  if (!token) {
    window.location.href = "/html/login.html";
    return;
  }

  try {
    const response = await fetch("/api/verify-session", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Token invalido o caducado");
      window.location.href = "/html/login.html";
      localStorage.removeItem("miTokenVip");
    } else {
      console.log("Acceso concedido");
    }
  } catch (error) {
    console.log("Error al acceder a la zona de gestión", error);
  }
}

document.addEventListener("DOMContentLoaded", verificarAcceso);

async function cargarArtistas() {
  const desplegable = document.getElementById("crear-artista");
  const desplegableUpdate = document.getElementById("modificar-artista");

  try {
    const response = await fetch("/api/artists", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Error al fetch de los artistas");
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
    console.log("Error al conseguir los artistas", error.message);
    desplegable.innerHTML =
      '<option value="" disabled selected>Error al cargar</option>';
    desplegableUpdate.innerHTML =
      '<option value="" disabled selected>Error al cargar</option>';
  }
}

async function cargarTiposProductos() {
  const desplegableTipos = document.getElementById("crear-tipo");
  const desplegableTiposUpdate = document.getElementById("modificar-tipo");

  try {
    const response = await fetch("/api/product-types", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
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
    desplegableTipos.innerHTML =
      '<option value="" disabled selected>Error al cargar</option>';
    desplegableTiposUpdate.innerHTML =
      '<option value="" disabled selected>Error al cargar</option>';
  }
}

// Añade esta función en tu private.js
async function cargarProductosDesplegables() {
  const selectModificar = document.getElementById("modificar-id");
  const selectEliminar = document.getElementById("eliminar-id");

  try {
    // Hacemos la petición a tu ruta del backend que devuelve todos los productos
    // Nota: Asegúrate de que esta URL coincide con la ruta real en tu userRoutes.js
    const respuesta = await fetch("/api/productos");

    if (!respuesta.ok) throw new Error("Error al obtener los productos");

    const data = await respuesta.json();

    const productos = data.products;

    // Limpiamos los selects por si tenían datos viejos y añadimos la opción por defecto
    const opcionPorDefecto =
      '<option value="" disabled selected>Selecciona un producto</option>';
    selectModificar.innerHTML = opcionPorDefecto;
    selectEliminar.innerHTML = opcionPorDefecto;

    // Iteramos sobre el array de productos que nos devolvió la base de datos
    productos.forEach((producto) => {
      // Creamos una nueva etiqueta <option>
      const opcion = document.createElement("option");

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
    selectModificar.innerHTML =
      '<option value="" disabled selected>Error al cargar</option>';
    selectEliminar.innerHTML =
      '<option value="" disabled selected>Error al cargar</option>';
  }
}

function mostrarFeedback(idElemento, mensaje, esExito) {
  // idElemento = Id del container de feedback, justo encima del boton
  const contenedor = document.getElementById(idElemento);
  // Mensaje que introducir en el container
  contenedor.textContent = mensaje;
  // Clase del container -> (esExito) ? success : error
  contenedor.className = `feedback-message ${esExito ? "success" : "error"}`;

  // Ocultar después de 5 segundos
  setTimeout(() => {
    contenedor.style.display = "none";
  }, 5000);
}

async function crearProducto() {
  const token = localStorage.getItem("miTokenVip");
  const feedbackId = "feedback-crear";

  // Bloquear botón
  boton_crear.disabled = true;
  boton_crear.textContent = "Añadiendo...";

  // Captura el valor del input
  const urlImagen = document.getElementById("crear-imagen").value;

  const nuevo_producto = {
    type: document.getElementById("crear-tipo").value,
    name: document.getElementById("crear-nombre").value,
    desc: document.getElementById("crear-desc").value,
    extra: document.getElementById("crear-extra").value,
    artist: document.getElementById("crear-artista").value,
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
      throw new Error(data.message || "Error al crear el producto");
    }

    // Muestra el feedback en caso de ser true
    mostrarFeedback(feedbackId, "Producto creado correctamente", true);

    // Limpiar formulario
    document.getElementById("crear-nombre").value = "";
    document.getElementById("crear-desc").value = "";
    document.getElementById("crear-extra").value = "";
    document.getElementById("crear-imagen").value = "";

    cargarProductosDesplegables();
  } catch (error) {
    // Muestra el feedback en caso de false
    mostrarFeedback(feedbackId, error.message, false);
  } finally {
    // Habilita otra vez el boton de añadir producto
    boton_crear.disabled = false;
    boton_crear.textContent = "Añadir Producto";
  }
}

async function actualizarProducto() {
  const token = localStorage.getItem("miTokenVip");
  const feedbackId = "feedback-modificar";

  const product_id = document.getElementById("modificar-id").value;

  if (!product_id) {
    mostrarFeedback(feedbackId, "Por favor, selecciona un producto", false);
    return;
  }

  const image = document.getElementById("modificar-imagen").value;

  const updated_product = {
    type: document.getElementById("modificar-tipo").value,
    name: document.getElementById("modificar-nombre").value,
    desc: document.getElementById("modificar-desc").value,
    extra: document.getElementById("modificar-extra").value,
    artist: document.getElementById("modificar-artista").value,
    image: JSON.stringify([image]),
  };

  boton_actualizar.disabled = true;
  boton_actualizar.textContent = "Actualizando...";

  try {
    const response = await fetch(`/api/productos/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated_product),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al actualizar el producto");
    }

    mostrarFeedback(feedbackId, "Producto actualizado con éxito", true);
    cargarProductosDesplegables();
  } catch (error) {
    mostrarFeedback(feedbackId, error.message, false);
  } finally {
    boton_actualizar.disabled = false;
    boton_actualizar.textContent = "Actualizar Datos";
  }
}

async function eliminarProducto() {
  const product_id = document.getElementById("eliminar-id").value;
  const token = localStorage.getItem("miTokenVip");
  const feedbackId = "feedback-eliminar";

  if (!product_id) {
    mostrarFeedback(feedbackId, "Selecciona un producto para eliminar", false);
    return;
  }

  // Abre una ventana para confirmar, o no, la eliminación del producto
  if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

  boton_eliminar.disabled = true;
  boton_eliminar.textContent = "Eliminando...";

  try {
    const response = await fetch(`/api/productos/${product_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      mostrarFeedback(feedbackId, "Producto eliminado correctamente", true);
      cargarProductosDesplegables();
    } else {
      throw new Error(data.message || "Error al eliminar");
    }
  } catch (error) {
    mostrarFeedback(feedbackId, error.message, false);
  } finally {
    boton_eliminar.disabled = false;
    boton_eliminar.textContent = "Eliminar permanentemente";
  }
}

function cargarTodo() {
  cargarArtistas();
  cargarProductosDesplegables();
  cargarTiposProductos();
}

document.addEventListener("DOMContentLoaded", cargarTodo);
boton_crear.addEventListener("click", crearProducto);
boton_actualizar.addEventListener("click", actualizarProducto);
boton_eliminar.addEventListener("click", eliminarProducto);
