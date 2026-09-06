const tbodyProductos = document.querySelector("#tabla-productos tbody");

if (tbodyProductos) {
    productos.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="../${p.imagen}" alt="${p.nombre}"></td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>$${p.precio.toLocaleString("es-CL")}</td>
            <td>
                <a href="admin-producto-form.html?id=${p.id}" class="btn-editar">Editar</a>
                <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>`;
        tbodyProductos.appendChild(fila);
    });
}

function eliminarProducto(id) {
    if (confirm("¿Eliminar este producto?")) {
        alert("Producto " + id + " eliminado (simulado).");
    }
}

const formProducto = document.getElementById("form-producto");

if (formProducto) {
    const params = new URLSearchParams(window.location.search);
    const idEditar = params.get("id");

    if (idEditar) {
        const productoExistente = productos.find(p => p.id == idEditar);
        if (productoExistente) {
            document.getElementById("titulo-form").textContent = "Editar producto";
            document.getElementById("codigo").value = productoExistente.id;
            document.getElementById("nombre").value = productoExistente.nombre;
            document.getElementById("descripcion").value = productoExistente.descripcion || "";
            document.getElementById("precio").value = productoExistente.precio;
            document.getElementById("categoria").value = productoExistente.categoria;
        }
    }

    formProducto.addEventListener("submit", function (e) {
        e.preventDefault();
        let valido = true;

        const codigo = document.getElementById("codigo");
        if (codigo.value.trim().length < 3) {
            mostrarError("error-codigo", "El código debe tener al menos 3 caracteres.");
            valido = false;
        } else limpiarError("error-codigo");

        const nombre = document.getElementById("nombre");
        if (nombre.value.trim() === "") {
            mostrarError("error-nombre", "El nombre es obligatorio.");
            valido = false;
        } else limpiarError("error-nombre");

        const precio = document.getElementById("precio");
        if (precio.value === "" || Number(precio.value) < 0) {
            mostrarError("error-precio", "El precio no puede ser negativo.");
            valido = false;
        } else limpiarError("error-precio");

        const stock = document.getElementById("stock");
        if (stock.value === "" || !Number.isInteger(Number(stock.value)) || Number(stock.value) < 0) {
            mostrarError("error-stock", "Ingresa un número entero igual o mayor a 0.");
            valido = false;
        } else limpiarError("error-stock");

        const stockCritico = document.getElementById("stockCritico");
        if (stockCritico.value !== "" && (!Number.isInteger(Number(stockCritico.value)) || Number(stockCritico.value) < 0)) {
            mostrarError("error-stockCritico", "Debe ser un número entero igual o mayor a 0.");
            valido = false;
        } else limpiarError("error-stockCritico");

        const categoria = document.getElementById("categoria");
        if (categoria.value === "") {
            mostrarError("error-categoria", "Selecciona una categoría.");
            valido = false;
        } else limpiarError("error-categoria");

        if (valido) {
            alert("Producto guardado correctamente");
            window.location.href = "admin-productos.html";
        }
    });
}