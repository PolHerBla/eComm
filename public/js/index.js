function crearCard(id, name, splatterImg, imgHover) {


  //Por cada producto
  const product = document.createElement('article');
  product.classList.add('product-card');

  const product_img_container = document.createElement('div');
  product_img_container.classList.add('product-image-container');

  //Dentro de product_img_container
  const mainImage = document.createElement('img');
  mainImage.classList.add('img-primary');
  mainImage.src = splatterImg;

  const hoverImg = document.createElement('img');
  hoverImg.classList.add('img-hover');
  hoverImg.src = imgHover;

  const product_info = document.createElement('div');
  product_info.classList.add('product-info');


  // Dentro de info
  const product_name = document.createElement('h3');
  product_name.textContent = `${name}`;


  // Añado cada elemento en si div
  product_img_container.append(mainImage, hoverImg);

  product_info.append(product_name);

  // Añado todo al div principal de producto
  product.append(product_img_container, product_info);


  product_img_container.addEventListener('click', () => {
    window.location.href = `/html/product.html?id=${id}`;
  });

  // Modifica a traves de css el estil del mouse al pasar per sobre del card
  product.style.cursor = "pointer";

  return product;
}

// async function cargarTodosProductos(params) {

//   try {
//     const response = await fetch("/api/productos", {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json"
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const products = data.products;

//       products.forEach((product) => {
//         const id = product.product_id;
//         const name = product.product_name;

//         const images = JSON.parse(product.product_images);
//         const splatterImg = images[0];
//         const imgHover = images[1] || images[0];

//         crearCard(id, name, splatterImg, imgHover);
//       });
//     } else {
//       throw new Error("Error al comunicar con el servidor");
//     }
//   } catch (error) {
//     console.log("Error al cargar productos", error.message);
//   }
// }

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

    const promesas = artistas.map(async (artista) => {
      const artistId = artista.artist_id;
      console.log(artistId);
      const res = await fetch(`/api/productos/artista/${artistId}`, {
        method: 'GET',
        headers: {
          "Content-type":"application/json"
        }
      });
      return res.json();
    })

    const productosArtista = await Promise.all(promesas);
    console.log(productosArtista);
    
    productosArtista.forEach(artista => {
      const main_block = document.getElementById('products-content');

      const artist_block = document.createElement("div");
      artist_block.classList.add("artist-block");

      const artist_button = document.createElement("button");
      artist_button.classList.add('artist-tag');
      artist_button.textContent = `${artista.products[0].artist_name}`;

      const artist_products = document.createElement("div");
      artist_products.classList.add("products-grid");

      artista.products.forEach((product) => {
        const id = product.product_id;
        const name = product.product_name;

        const images = JSON.parse(product.product_images);
        const splatterImg = images[0];
        const imgHover = images[1] || images[0];

        const card = crearCard(id, name, splatterImg, imgHover);

        artist_products.append(card);
      });

      artist_block.append(artist_button, artist_products);

      main_block.append(artist_block);

    });


  } catch (error) {
    console.log("Error inesperado", error.message);
  }
}

document.addEventListener("DOMContentLoaded", cargarProductosPagina);
// document.addEventListener("DOMContentLoaded", cargarTodosProductos);

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


