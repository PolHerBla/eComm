const prodImg = document.getElementById('imagen-producto');
const prodName = document.getElementById('titulo-producto');
const prodDesc = document.getElementById('descripcion-producto');


function getToken() {
    const token = localStorage.getItem('miTokenVip');
    return token;
}

function cargarProducto() {
    // Objecte amb les propietats de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const token = getToken();

    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `bearer ${token}`,
                "Content-type":"application/json"
            }
        })

        if (response.ok) {

            const data = response.json();
            const product = data.product;

            let productName = product.product_name;
            let productDesc = product.product_desc;
            let productExtra = product.product_extra_info;

            let images = JSON.parse(product.product_images);

            prodImg.src = images[0] || images[1];
            prodName.innerText = productName;
            prodDesc.innerHTML = productDesc;

        } else {
            throw new Error("Error al pedir el producto");
        }

    } catch (err) {
        console.log("Error al conseguir el producto", err.message);
    }
}