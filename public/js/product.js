const prodImg = document.getElementById('imagen-producto');
const prodImgHover = document.getElementById("imagen-producto-hover");

const prodName = document.getElementById('titulo-producto');
const prodDesc = document.getElementById('descripcion-producto');

function changeOnHover(target, mainImg, secondaryImg) {
  target.addEventListener("mouseenter", () => {
    target.src = `${secondaryImg}`;
  });

  target.addEventListener("mouseleave", () => {
    target.src = `${mainImg}`;
  });
}

async function cargarProducto() {
    // Objecte amb les propietats de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'GET',
            headers: {
                "Content-type":"application/json"
            }
        })

        if (response.ok) {
          const data = await response.json();
          const product = data.product;

          let productName = product.product_name;
          let productDesc = product.product_desc;
          let productExtra = product.product_extra_info;

          let images = JSON.parse(product.product_images);

          // Asignamos las dos imágenes
          prodImg.src = images[0];
          // Si no hay segunda imagen, usamos la primera por defecto
          prodImgHover.src = images[1] || images[0];

          prodName.innerText = productName;
          prodDesc.innerHTML = productDesc;

          prodImg.addEventListener("", () => {});
        } else {
            throw new Error("Error al pedir el producto");
        }

    } catch (err) {
        console.log("Error al conseguir el producto", err.message);
    }
}

document.addEventListener('DOMContentLoaded', cargarProducto);