const botonToggle = document.getElementById('toggle-contrasena');
const inputContrasena = document.getElementById('contrasena');

botonToggle.addEventListener('click', () => {
    const esPassword = inputContrasena.type === 'password';
    inputContrasena.type = esPassword ? 'text' : 'password';
    botonToggle.textContent = esPassword ? 'Ocultar' : 'Ver';
});

const formularioLogin = document.getElementById("formulario");

formularioLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const correoIngresado = document.getElementById("correo").value.trim().toLowerCase();

    const usuarioEncontrado = usuarios.find(
        u => u.correo.toLowerCase() === correoIngresado 
    );

    if (!usuarioEncontrado) {
        alert("Correo o contraseña incorrectos.");
        return;
    }

    if (usuarioEncontrado.tipo === "Administrador" || usuarioEncontrado.tipo === "Vendedor") {
        window.location.href = "admin/admin-home.html";
    } else {
        window.location.href = "index.html";
    }
});