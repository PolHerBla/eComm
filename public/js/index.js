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

      console.log(products);

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

document.addEventListener("DOMContentLoaded", cargarTodosProductos);


