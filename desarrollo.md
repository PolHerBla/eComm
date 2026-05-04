### 🚀 El Corazón del Proyecto: Backend con Node.js y Express
Para el servidor he optado por **Node.js** con el framework **Express**, ya que es el estándar de la industria y me permite usar JavaScript tanto en el cliente como en el servidor. La arquitectura sigue el patrón **MVC (Modelo-Vista-Controlador)** para mantener el código limpio y escalable:

*   **Rutas (`/routes`)**: Funcionan como el sistema de tráfico de la app. He separado las rutas por recursos (usuarios, productos, artistas). Cada ruta está vinculada a un método HTTP específico (GET para leer, POST para crear, PUT para actualizar y DELETE para borrar). Además, aquí es donde inyecto el middleware de seguridad en las rutas que lo requieren.
*   **Controladores (`/controller`)**: Aquí reside la lógica de negocio. El controlador recibe el `req` (la petición del usuario), extrae los datos del `body` o de los `params`, y decide qué hacer. Antes de enviar nada a la base de datos, el controlador valida que los datos sean correctos. Una vez recibe la respuesta del modelo, envía un `res.json()` con el código de estado adecuado (200 para OK, 201 para creado, 400 por errores del cliente, 500 para errores del servidor, etc.).
*   **Modelos (`/model`)**: Es la capa de abstracción de datos. En lugar de meter SQL en medio de la lógica, el modelo expone funciones limpias como `getAllProducts()` o `deleteProduct(id)`. Esto facilita muchísimo el mantenimiento si en el futuro decidiera cambiar la estructura de las tablas.

### 🗄️ Gestión de Datos: MySQL y Relaciones
La base de datos es el alma del proyecto. He usado **MySQL** por su robustez y porque nos permite trabajar con esquemas relacionales claros. 

*   **Conexión (`config/db.js`)**: He configurado un pool de conexiones para que la app sea más eficiente, gestionando las credenciales (host, user, password, database) de forma centralizada.
*   **Estructura Relacional**: No es una tabla plana. He diseñado relaciones de **Clave Foránea (FK)** entre productos, tipos de productos y artistas. Esto permite, por ejemplo, que al borrar un artista podamos decidir qué pasa con sus productos, manteniendo siempre la **integridad referencial**. Las queries usan `JOIN` para traer información combinada en una sola petición, optimizando el rendimiento.

### 🔐 Seguridad Avanzada: JWT (JSON Web Tokens)
Para que el panel de gestión no sea una "puerta abierta", he implementado un sistema de autenticación basado en **JWT**.

*   **Flujo de Autenticación**: Cuando el admin hace login, el servidor valida sus credenciales contra la base de datos (usando encriptación si fuera necesario). Si son correctas, se genera un token firmado con una "clave secreta".
*   **Middleware de Protección (`webToken.js`)**: He creado una función que intercepta las peticiones a rutas sensibles. Esta función busca el token en la cabecera `Authorization`. Si el token no existe, ha caducado o ha sido manipulado, la petición se corta ahí mismo con un error 401 (No autorizado).
*   **Seguridad en el Cliente**: El token se guarda en el `localStorage` del navegador y se adjunta automáticamente en cada petición `fetch` que requiera permisos de admin.

### 🎨 Frontend Dinámico: JavaScript Vainilla y UX
En lugar de usar React o Vue, he querido dominar primero el **DOM (Document Object Model)** con JavaScript puro. La comunicación con el servidor es totalmente asíncrona mediante la **Fetch API**.

*   **Peticiones Asíncronas (Async/Await)**: Toda la lógica de red usa `async/await` para manejar la asincronía de forma legible. Esto me permite esperar a que el servidor responda antes de actualizar la interfaz, evitando que el usuario vea datos corruptos o a medio cargar.
*   **Sistema de Feedback Visual**: He programado una lógica que inyecta clases CSS (`.success` o `.error`) en contenedores específicos. Cuando una acción termina, el usuario recibe un mensaje claro y el formulario se limpia automáticamente. Además, uso `setTimeout` para que estos mensajes desaparezcan solos después de unos segundos, manteniendo la interfaz limpia.
*   **Control de Estado de la UI**: Para mejorar la robustez, he implementado el bloqueo de botones. Al iniciar una petición, el botón pasa a estado `disabled`, lo que visualmente le indica al usuario que la app está "pensando" y evita que se envíen múltiples peticiones idénticas si el usuario hace clic varias veces por error.

### ✅ El Ciclo CRUD en Detalle
El panel de administración (`private.html`) es una herramienta de gestión completa:
1.  **Create (Crear)**: Un formulario dinámico que convierte los datos del usuario en un objeto JSON. He incluido lógica para manejar arrays de imágenes (aunque solo subamos una por ahora) para que el sistema sea compatible con futuras versiones de la tienda.
2.  **Read (Leer)**: Al cargar la página, se lanzan varias peticiones en paralelo para rellenar los desplegables de productos, artistas y tipos. Así el admin siempre trabaja sobre datos actualizados en tiempo real.
3.  **Update (Actualizar)**: El sistema permite seleccionar un producto existente, cargar sus datos y enviar solo las modificaciones necesarias al servidor mediante un método `PUT`.
4.  **Delete (Eliminar)**: Es la acción más crítica. He incluido un `confirm()` nativo de JS para pedir confirmación al usuario. Si acepta, se envía la petición `DELETE` y, al recibir el OK del servidor, se recargan los desplegables automáticamente para reflejar que el producto ya no existe.


