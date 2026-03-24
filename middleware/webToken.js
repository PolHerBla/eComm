const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // 1. Buscamos el token en las cabeceras (headers) de la petición
    const authHeader = req.headers['authorization'];
    
    // El formato estándar es "Bearer <token>", así que lo separamos
    const token = authHeader && authHeader.split(' ')[1]; 

    // 2. Si no hay token, rechazamos la entrada
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Se requiere un token.' });
    }

    try {
        // 3. Verificamos que el token sea auténtico usando nuestra palabra secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Guardamos los datos descifrados del usuario en la petición por si los necesitamos luego
        req.user = verified; 
        
        // 5. Permitimos que la petición continúe hacia el controlador
        next(); 
    } catch (error) {
        res.status(400).json({ error: 'Token no válido o expirado.' });
    }
};

module.exports = verifyToken;