document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("productos-grid");
    if (!contenedor) return;

    productos.forEach(p => {
        const articulo = document.createElement("article");
        articulo.className = "product-card";
        articulo.innerHTML = `
            <a href="detalle-producto.html?id=${p.id}">
                <img src="${p.imagen}" alt="${p.nombre}">
            </a>
            <a href="detalle-producto.html?id=${p.id}" class="product-title">${p.nombre}</a>
            <p class="product-price">$${p.precio.toLocaleString('es-CL')}</p>
            <button type="button" class="btn-add-cart">Añadir</button>
        `;
        contenedor.appendChild(articulo);
    });
});