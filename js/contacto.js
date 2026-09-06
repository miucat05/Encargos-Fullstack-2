document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");
    const comentarioInput = document.getElementById("comentario");

    const errorNombre = document.getElementById("error-nombre");
    const errorCorreo = document.getElementById("error-correo");
    const errorComentario = document.getElementById("error-comentario");

    // dominios de correo permitidos
    const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

    function validarNombre() {
        const valor = nombreInput.value.trim();

        if (valor === "") {
            mostrarError(nombreInput, errorNombre, "El nombre es obligatorio.");
            return false;
        }
        if (valor.length > 100) {
            mostrarError(nombreInput, errorNombre, "El nombre no puede superar los 100 caracteres.");
            return false;
        }
        limpiarError(nombreInput, errorNombre);
        return true;
    }

    function validarCorreo() {
        const valor = correoInput.value.trim();

        if (valor === "") {
            mostrarError(correoInput, errorCorreo, "El correo es obligatorio.");
            return false;
        }
        if (valor.length > 100) {
            mostrarError(correoInput, errorCorreo, "El correo no puede superar los 100 caracteres.");
            return false;
        }

        // extrae el dominio
        const partes = valor.split("@");
        const dominio = partes.length === 2 ? partes[1].toLowerCase() : "";

        if (!dominiosPermitidos.includes(dominio)) {
            mostrarError(correoInput, errorCorreo, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return false;
        }

        limpiarError(correoInput, errorCorreo);
        return true;
    }

    function validarComentario() {
        const valor = comentarioInput.value.trim();

        if (valor === "") {
            mostrarError(comentarioInput, errorComentario, "El comentario es obligatorio.");
            return false;
        }
        if (valor.length > 500) {
            mostrarError(comentarioInput, errorComentario, "El comentario no puede superar los 500 caracteres.");
            return false;
        }
        limpiarError(comentarioInput, errorComentario);
        return true;
    }

    function mostrarError(input, contenedorError, mensaje) {
        input.classList.add("is-invalid");
        contenedorError.textContent = mensaje;
    }

    function limpiarError(input, contenedorError) {
        input.classList.remove("is-invalid");
        contenedorError.textContent = "";
    }

    // valida mientras uno escribe
    nombreInput.addEventListener("input", validarNombre);
    correoInput.addEventListener("input", validarCorreo);
    comentarioInput.addEventListener("input", validarComentario);

    // valida todo antes de encviar
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombreValido = validarNombre();
        const correoValido = validarCorreo();
        const comentarioValido = validarComentario();

        if (nombreValido && correoValido && comentarioValido) {
            alert("¡Mensaje enviado con éxito!");
            form.reset();
        }
    });
});