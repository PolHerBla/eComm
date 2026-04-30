function crearCard(id, name, splatterImg, imgHover) {
  const section = document.getElementById("products-div");

  const card = document.createElement("article");
  card.classList.add("product-card");

  const cardImg = document.createElement("div");
  cardImg.classList.add("product-image-container");

  const imagePrimary = document.createElement("img");
  imagePrimary.classList.add("img-primary");
  imagePrimary.src = `${splatterImg}`;

  const imageHover = document.createElement("img");
  imageHover.classList.add("img-hover");
  imageHover.src = `${imgHover}`;

  cardImg.append(imagePrimary, imageHover);

  cardImg.addEventListener('click', () => {
    window.location.href = `/html/product.html?id=${id}`;
  });

  // Modifica a traves de css el estil del mouse al pasar per sobre del card
  card.style.cursor = "pointer";

  const cardProductInfo = document.createElement("div");
  cardProductInfo.classList.add("product-info");

  const cardProductName = document.createElement("h3");

  const cardProductPrice = document.createElement("p");

  cardProductName.textContent = `${name}`;

  cardProductInfo.append(cardProductName);
  card.append(cardImg);
  card.append(cardProductInfo);

  section.append(card);
}

async function cargarTodosProductos(params) {

  try {
    const response = await fetch("/api/productos", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    });

    if (response.ok) {
      const data = await response.json();
      const products = data.products;

      products.forEach((product) => {
        const id = product.product_id;
        const name = product.product_name;

        const images = JSON.parse(product.product_images);
        const splatterImg = images[0];
        const imgHover = images[1] || images[0];

        crearCard(id, name, splatterImg, imgHover);
      });
    } else {
      throw new Error("Error al comunicar con el servidor");
    }
  } catch (error) {
    console.log("Error al cargar productos", error.message);
  }
}

async function cargarProductosPagina(params) {
  try {
    const response = await fetch("/api/artists", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Error al fetchear artistas");

    const data = await response.json();
    const artistas = data.artists;

    console.log(artistas);

    const promesas = artistas.map(async (artista) => {
      const artistId = artista.artist_id;
      console.log(artistId);
      const res = await fetch(`/api/productos/aritsta/${artistId}`, {
        method: 'GET',
        headers: {
          "Content-type":"application/json"
        }
      });
      return res.json();
    })

    const productos = await Promise.all(promesas);
    console.log(productos);


  } catch (error) {
    console.log("Error inesperado", error.message);
  }
}



document.addEventListener("DOMContentLoaded", cargarProductosPagina);
document.addEventListener("DOMContentLoaded", cargarTodosProductos);

// JS per al CSS

// Lógica para el menú desplegable
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Alternar el menú al hacer clic en el botón
  menuBtn.addEventListener("click", (event) => {
    // Evitamos que el clic se propague al documento (útil para el siguiente paso)
    event.stopPropagation();
    dropdownMenu.classList.toggle("show-menu");
  });

  // Cerrar el menú si el usuario hace clic en cualquier parte fuera de él
  document.addEventListener("click", (event) => {
    if (!dropdownMenu.contains(event.target) && !menuBtn.contains(event.target)) {
      dropdownMenu.classList.remove("show-menu");
    }
  });
});


