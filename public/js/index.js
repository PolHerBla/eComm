

async function cargarProductos(params) {
    const token = cargarToken();

    try {
        const response = await fetch("http://localhost:8080/api/productos", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": 'application/json'
            },
        });

        if (response.ok) {
            console.log(response);
        } else {
            throw new Error("Error al comunicar con el servidor");
        }
    } catch (error) {
        console.log('Error al cargar productos', error.message);
    }
}

function insertProducts() { }

document.addEventListener("DOMContentLoaded", cargarProductos());

function cargarToken() {
    let token = localStorage.getItem("miTokenVip");
    return token;
}
