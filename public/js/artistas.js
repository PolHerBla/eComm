function crearCardArtista(id, name, description, image, hoverImage) {
  const artist = document.createElement("article");
  artist.classList.add("product-card");

  const img_container = document.createElement("div");
  img_container.classList.add("product-image-container");

  const mainImage = document.createElement("img");
  mainImage.classList.add("img-primary");
  mainImage.src = image;

  const hoverImg = document.createElement("img");
  hoverImg.classList.add("img-hover");
  hoverImg.src = hoverImage || image;

  const artist_info = document.createElement("div");
  artist_info.classList.add("product-info");

  const artist_name = document.createElement("h3");
  artist_name.textContent = name;

  img_container.append(mainImage, hoverImg);
  artist_info.append(artist_name);
  artist.append(img_container, artist_info);

  return artist;
}

async function cargarArtistasPagina() {
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

    const grid = document.getElementById("artists-grid");

    artistas.forEach((artista) => {
      const id = artista.artist_id;
      const name = artista.artist_name;
      const description = artista.artist_description;

      let image = "";
      let hoverImage = "";
      try {
        const images = JSON.parse(artista.artist_images);
        image = images[0] || "";
        hoverImage = images[1] || image;
      } catch (e) {
        image = artista.artist_images || "";
        hoverImage = image;
      }

      const card = crearCardArtista(id, name, description, image, hoverImage);
      grid.append(card);
    });
  } catch (error) {
    console.log("Error inesperado", error.message);
  }
}

document.addEventListener("DOMContentLoaded", cargarArtistasPagina);

// Lógica para el menú desplegable
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show-menu");
  });

  document.addEventListener("click", (event) => {
    if (
      !dropdownMenu.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show-menu");
    }
  });
});
