const getAllUrl = "http://127.0.0.1:8080/api/users";

// const loadAllButton = document.getElementById("loadAllButton");

// const inputBoxId = document.getElementById("inputUserId");

// const createUserButton = document.getElementById("createUserButton");

// const deleteUserButton = document.getElementById("deleteUserButton");

// const updateUserButton = document.getElementById("updateUserButton");

const tokenButton = document.getElementById("tokenButton");

const campoEstado = document.getElementById('mensajeEstado');

// async function getAllUsers() {
//   const token = localStorage.getItem("miTokenVIP");

//   try {
//     const res = await fetch("http://127.0.0.1:8080/api/users/", {
//       method: "GET",
//       headers: {
//         2. Aquí es donde se mete el token
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       let userNames = data.users
//         .map(
//           (user) =>
//             `ID: ${user.id}  -  NOMBRE: ${user.nombre} ${user.apellido1} ${user.apellido2}  -  EMAIL: ${user.email}`,
//         )
//         .join("\n");
//       console.log(userNames);
//     } else {
//       throw new Error("Error en la respuesta del servidor");
//     }
//   } catch (error) {
//     console.log("Error al cargar los usuarios:", error.message);
//   }
// }

// async function getUserById() {
//   let userId = inputBoxId.value;
//   const token = localStorage.getItem("miTokenVIP");

//   if (!userId) {
//     console.log("Vacío");
//     return;
//   }

//   try {
//     const getByIdUrl = `http://127.0.0.1:8080/api/users/${userId}`;
//     const response = await fetch(getByIdUrl, {
//       method: "GET",
//       headers: {
//         2. Aquí es donde se mete el token
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       console.log("Usuario no encontrado");
//     }

//     const data = await response.json();
//     let userName = data?.user?.nombre;

//     if (userName) {
//       console.log(userName);
//     } else {
//       console.log(
//         "El usuario no tiene nombre o este esta en un formato incorrecto",
//       );
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// async function createUser() {
//   const token = localStorage.getItem("miTokenVIP");

//   let userSurname1 = document.getElementById("userSurname1").value;
//   let userSurname2 = document.getElementById("userSurname2").value;
//   let userName = document.getElementById("userName").value;
//   let userEmail = document.getElementById("userEmail").value;

//   const newUser = {
//     nombre: userName,
//     apellido1: userSurname1,
//     apellido2: userSurname2,
//     email: userEmail,
//   };

//   try {
//     const response = await fetch("http://127.0.0.1:8080/api/users/", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(newUser),
//     });

//     if (response.ok) {
//       console.log("Usuario creado correctamente");
//     } else {
//       console.error("Error del servidor:", resultado.error);
//     }

//     const resultado = await response.json();

//     console.log("Usuario creado:", newUser);
//   } catch (error) {
//     console.log("Error al de red:", error);
//   }
// }

// async function deleteUser() {
//   const token = localStorage.getItem("miTokenVIP");

//   const userId = parseInt(
//     Number(document.getElementById("deleteUserInput").value),
//   );
//   const url = `http://127.0.0.1:8080/api/users/${userId}`;

//   try {
//     if (userId === 0) {
//       console.log("Usuario a eliminar indefinido");
//       return;
//     }

//     const response = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await response.json();

//     if (response.ok) {
//       console.log(`${data.message}`);
//       console.log(userId);
//     } else {
//       console.log(`${data.error}`);
//     }
//   } catch (error) {
//     console.log("Error al eliminar usuario:", error);
//   }
// }

// async function updateUser() {
//   const token = localStorage.getItem("miTokenVIP");

//   const userId = document.getElementById("updateUserId").value;
//   const newName = document.getElementById("updateUserNewName").value;

//   const url = `http://127.0.0.1:8080/api/users/${userId}`;

//   const updateUser = {
//     id: userId,
//     nombre: newName,
//   };

//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(updateUser),
//     });
//     const data = await response.json();

//     if (response.ok) {
//       console.log(`${data.message}`);
//     } else {
//       console.log(`${data.error}`);
//     }
//   } catch (error) {
//     console.log("Error al actualizar el usuario:", error);
//   }
// }

async function login() {
  const emailInput = document.getElementById("inputEmail").value;
  const passwordInput = document.getElementById("inputPassword").value;

  try {
    const response = await fetch("http://127.0.0.1:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    });
    const data = await response.json();

    if (response.ok) 
      {
      localStorage.setItem("miTokenVIP", data.token);
      console.log(data.token);
      campoEstado.innerHTML = "Inicio de sesión correcto";
      campoEstado.style.backgroundColor = "#00a389";
      campoEstado.classList.add("mostrar-mensaje");

      setTimeout(() => {
        window.location.href = "ecommerce.html";
      }, 2000)
    } 
    else
    {
      console.log("Error de credenciales");

      campoEstado.innerHTML = "Credenciales Incorrectas";
      campoEstado.style.backgroundColor = "#e32400";
      campoEstado.classList.add("mostrar-mensaje");
    }
    
  } catch (error) {
    console.log(error);

    campoEstado.innerHTML = "Error de conexión"
    campoEstado.style.backgroundColor = "#e32400";
    campoEstado.classList.add("mostrar-mensaje");
  }
}

// loadAllButton.addEventListener("click", getAllUsers);

// updateUserButton.addEventListener("click", updateUser);

// deleteUserButton.addEventListener("click", deleteUser);

// inputBoxId.addEventListener("input", getUserById);

// createUserButton.addEventListener("click", createUser);

tokenButton.addEventListener("click", login);
