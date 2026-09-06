const tbodyUsuarios = document.querySelector("#tabla-usuarios tbody");

if (tbodyUsuarios) {
    usuarios.forEach((u, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${u.run}</td>
            <td>${u.nombre} ${u.apellidos}</td>
            <td>${u.correo}</td>
            <td>${u.tipo}</td>
            <td>
                <a href="admin-usuario-form.html?id=${index}" class="btn-editar">Editar</a>
                <button class="btn-eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>`;
        tbodyUsuarios.appendChild(fila);
    });
}

function eliminarUsuario(index) {
    if (confirm("¿Eliminar este usuario?")) {
        alert("Usuario eliminado (simulado).");
    }
}

const formUsuario = document.getElementById("form-usuario");

if (formUsuario) {
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    Object.keys(regionesComunas).forEach(region => {
        const opt = document.createElement("option");
        opt.value = region;
        opt.textContent = region;
        selectRegion.appendChild(opt);
    });

    function actualizarComunas(regionSeleccionada) {
        selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
        (regionesComunas[regionSeleccionada] || []).forEach(comuna => {
            const opt = document.createElement("option");
            opt.value = comuna;
            opt.textContent = comuna;
            selectComuna.appendChild(opt);
        });
    }

    selectRegion.addEventListener("change", () => actualizarComunas(selectRegion.value));

    const params = new URLSearchParams(window.location.search);
    const idEditar = params.get("id");

    if (idEditar !== null) {
        const u = usuarios[idEditar];
        if (u) {
            document.getElementById("titulo-form").textContent = "Editar usuario";
            document.getElementById("run").value = u.run;
            document.getElementById("nombre").value = u.nombre;
            document.getElementById("apellidos").value = u.apellidos;
            document.getElementById("correo").value = u.correo;
            document.getElementById("fechaNacimiento").value = u.fechaNacimiento || "";
            document.getElementById("tipoUsuario").value = u.tipo;
            selectRegion.value = u.region;
            actualizarComunas(u.region);
            document.getElementById("comuna").value = u.comuna;
            document.getElementById("direccion").value = u.direccion;
        }
    }

    formUsuario.addEventListener("submit", function (e) {
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

        const correo = document.getElementById("correo");
        if (!validarCorreoInstitucional(correo.value)) {
            mostrarError("error-correo", "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            valido = false;
        } else limpiarError("error-correo");

        const tipoUsuario = document.getElementById("tipoUsuario");
        if (tipoUsuario.value === "") {
            mostrarError("error-tipoUsuario", "Selecciona un tipo de usuario.");
            valido = false;
        } else limpiarError("error-tipoUsuario");

        const direccion = document.getElementById("direccion");
        if (direccion.value.trim() === "") {
            mostrarError("error-direccion", "La dirección es obligatoria.");
            valido = false;
        } else limpiarError("error-direccion");

        if (valido) {
            alert("Usuario guardado correctamente");
            window.location.href = "admin-usuarios.html";
        }
    });
}