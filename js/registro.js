document.addEventListener("DOMContentLoaded", () => {

    function activarToggle(idBoton, idInput) {
        const boton = document.getElementById(idBoton);
        const input = document.getElementById(idInput);

        boton.addEventListener('click', () => {
            const esPassword = input.type === 'password';
            input.type = esPassword ? 'text' : 'password';
            boton.textContent = esPassword ? 'Ocultar' : 'Ver';
        });
    }

    activarToggle('toggle-contrasena-registro', 'contrasena-registro');
    activarToggle('toggle-confirmar', 'confirmar-contrasena');

    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    Object.keys(regionesComunas).forEach(region => {
        const opt = document.createElement("option");
        opt.value = region;
        opt.textContent = region;
        selectRegion.appendChild(opt);
    });

    selectRegion.addEventListener("change", () => {
        selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
        (regionesComunas[selectRegion.value] || []).forEach(comuna => {
            const opt = document.createElement("option");
            opt.value = comuna;
            opt.textContent = comuna;
            selectComuna.appendChild(opt);
        });
    });

    // validación al enviar
    const form = document.getElementById("formulario-registro");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valido = true;

        const run = document.getElementById("run");
        if (!validarRun(run.value)) {
            mostrarError("error-run", "El RUN ingresado no es válido.");
            valido = false;
        } else limpiarError("error-run");

        const nombre = document.getElementById("nombre");
        if (nombre.value.trim() === "") {
            mostrarError("error-nombre", "El nombre es obligatorio.");
            valido = false;
        } else limpiarError("error-nombre");

        const apellidos = document.getElementById("apellidos");
        if (apellidos.value.trim() === "") {
            mostrarError("error-apellidos", "Los apellidos son obligatorios.");
            valido = false;
        } else limpiarError("error-apellidos");

        const correo = document.getElementById("correo-registro");
        if (!validarCorreoInstitucional(correo.value)) {
            mostrarError("error-correo-registro", "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            valido = false;
        } else limpiarError("error-correo-registro");

        const direccion = document.getElementById("direccion");
        if (direccion.value.trim() === "") {
            mostrarError("error-direccion", "La dirección es obligatoria.");
            valido = false;
        } else limpiarError("error-direccion");

        const contrasena = document.getElementById("contrasena-registro");
        const confirmar = document.getElementById("confirmar-contrasena");

        if (contrasena.value.length < 4 || contrasena.value.length > 10) {
            mostrarError("error-contrasena-registro", "La contraseña debe tener entre 4 y 10 caracteres.");
            valido = false;
        } else {
            limpiarError("error-contrasena-registro");
        }

        if (confirmar.value !== contrasena.value || confirmar.value === "") {
            mostrarError("error-confirmar-contrasena", "Las contraseñas no coinciden.");
            valido = false;
        } else {
            limpiarError("error-confirmar-contrasena");
        }
        console.log("RUN ingresado:", JSON.stringify(run.value), "- Valido general:", valido, "- validarRun():", validarRun(run.value));

        if (!valido) return;

        // crear el nuevo usuario
        const nuevoUsuario = {
            run: run.value.replace(/[.\-]/g, "").toUpperCase(),
            nombre: nombre.value.trim(),
            apellidos: apellidos.value.trim(),
            correo: correo.value.trim(),
            contrasena: contrasena.value,
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            tipo: "Cliente",
            region: selectRegion.value,
            comuna: selectComuna.value,
            direccion: direccion.value.trim()
        };

        usuarios.push(nuevoUsuario);

        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
    });
});