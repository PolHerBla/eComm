async function cargarProductos(params) {
    const token = cargarToken();

    try {
        const response = await fetch("/api/productos", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            const products = data.products;

            console.log(products);

            products.forEach(product => {
                const name = product.product_name;

                const images = JSON.parse(product.product_images);
                const splatterImg = images[0];
                const imgHover = images[1] || images[0]

                crearCard(name, splatterImg, imgHover);
            });
        } else {
            throw new Error("Error al comunicar con el servidor");
        }
    } catch (error) {
        console.log('Error al cargar productos', error.message);
    }
}

function insertProducts() { }

document.addEventListener("DOMContentLoaded", cargarProductos);

function cargarToken() {
    let token = localStorage.getItem("miTokenVip");
    return token;
}

function crearCard(name, splatterImg, imgHover) {
    const section = document.getElementById('products-div');

    const card = document.createElement('article');
    card.classList.add("product-card");
    
    const cardImg = document.createElement('div');
    cardImg.classList.add("product-image-container");

    const imagePrimary = document.createElement('img');
    imagePrimary.classList.add("img-primary");
    imagePrimary.src = `${splatterImg}`;

    const imageHover = document.createElement('img');
    imageHover.classList.add("img-hover");
    imageHover.src = `${imgHover}`;

    cardImg.append(imagePrimary, imageHover)

    // Events que pertanyen a cada card i canvien la imatge al fer hover amb el mouse
    cardImg.addEventListener('mouseenter', () => {
        cardImg.src = `${imgHover}`;
    })

    cardImg.addEventListener("mouseleave", () => {
      cardImg.src = `${splatterImg}`;
    });

    const cardProductInfo = document.createElement('div');
    cardProductInfo.classList.add('product-info');

    const cardProductName = document.createElement('h3');

    const cardProductPrice = document.createElement('p');

    cardProductName.textContent = `${name}`;
    
    cardProductInfo.append(cardProductName);
    card.append(cardImg);
    card.append(cardProductInfo);

    section.append(card);
}



/*
<article class="product-card">
    <div class="product-image"></div>
    <div class="product-info">
        <h3>Producto 01</h3>
        <p>$99.00</p>
    </div>
</article>
*/

/*
    1. Apuntar a el section/div
    2. Crear el card del producte
    3. Append al section div
*/


