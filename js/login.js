document.addEventListener("DOMContentLoaded", () => {
    const botonToggle = document.getElementById('toggle-contrasena');
    const inputContrasena = document.getElementById('contrasena');
    const inputCorreo = document.getElementById('correo');
    const formularioLogin = document.getElementById("formulario");

    const errorCorreo = document.getElementById("error-correo");
    const errorContrasena = document.getElementById("error-contrasena");

    const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

    // mostrar u ocultar contraseña
    botonToggle.addEventListener('click', () => {
        const esPassword = inputContrasena.type === 'password';
        inputContrasena.type = esPassword ? 'text' : 'password';
        botonToggle.textContent = esPassword ? 'Ocultar' : 'Ver';
    });

    function mostrarError(input, contenedorError, mensaje) {
        input.classList.add("is-invalid");
        contenedorError.textContent = mensaje;
    }

    function limpiarError(input, contenedorError) {
        input.classList.remove("is-invalid");
        contenedorError.textContent = "";
    }

    function validarCorreo() {
        const valor = inputCorreo.value.trim();

        if (valor === "") {
            mostrarError(inputCorreo, errorCorreo, "El correo es obligatorio.");
            return false;
        }
        if (valor.length > 100) {
            mostrarError(inputCorreo, errorCorreo, "El correo no puede superar los 100 caracteres.");
            return false;
        }

        const partes = valor.split("@");
        const dominio = partes.length === 2 ? partes[1].toLowerCase() : "";

        if (!dominiosPermitidos.includes(dominio)) {
            mostrarError(inputCorreo, errorCorreo, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return false;
        }

        limpiarError(inputCorreo, errorCorreo);
        return true;
    }

    function validarContrasena() {
        const valor = inputContrasena.value;

        if (valor === "") {
            mostrarError(inputContrasena, errorContrasena, "La contraseña es obligatoria.");
            return false;
        }
        if (valor.length < 4 || valor.length > 10) {
            mostrarError(inputContrasena, errorContrasena, "La contraseña debe tener entre 4 y 10 caracteres.");
            return false;
        }

        limpiarError(inputContrasena, errorContrasena);
        return true;
    }

    // vaalidación en tiempo real
    inputCorreo.addEventListener("input", validarCorreo);
    inputContrasena.addEventListener("input", validarContrasena);

    formularioLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const correoValido = validarCorreo();
        const contrasenaValida = validarContrasena();

        if (!correoValido || !contrasenaValida) {
            return;
        }

        const correoIngresado = inputCorreo.value.trim().toLowerCase();
        const contrasenaIngresada = inputContrasena.value;

        const usuarioEncontrado = usuarios.find(
            u => u.correo.toLowerCase() === correoIngresado
        );

        if (!usuarioEncontrado || usuarioEncontrado.contrasena !== contrasenaIngresada) {
            mostrarError(inputContrasena, errorContrasena, "Correo o contraseña incorrectos.");
            return;
        }

        if (usuarioEncontrado.tipo === "Administrador" || usuarioEncontrado.tipo === "Vendedor") {
            window.location.href = "admin/admin-home.html";
        } else {
            window.location.href = "index.html";
        }
    });
});