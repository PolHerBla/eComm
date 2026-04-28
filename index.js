const app = require("./app");
const path = require('path'); // <--- Añade esta línea
require('dotenv').config();

const port = process.env.port;

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Cuando alguien entra a http://localhost:8080/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'ecommerce.html'));
});