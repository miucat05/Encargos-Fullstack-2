//para leer el id con la url
const parametros = new URLSearchParams(window.location.search);
const idProducto = Number(parametros.get('id'));

//busca el producto que coincide con el id
const producto = productos.find(p => p.id === idProducto);

//SI se encuentra se rellena el html con los datos
if (producto) {
    document.getElementById('detail-title').textContent = producto.nombre;
    document.getElementById('detail-price').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
    document.getElementById('detail-description').textContent = producto.descripcion;
    document.getElementById('main-product-img').src = producto.imagen;
    document.getElementById('main-product-img').alt = producto.nombre;

    renderRelacionados(producto);
} else {
    console.error('Producto no encontrado');
}

function renderRelacionados(productoActual) {
    const contenedor = document.getElementById('related-products-grid');
    if (!contenedor) return;

    // productos de la misma categoría, sin incluir el que se está viendo
    const relacionados = productos
        .filter(p => p.categoria === productoActual.categoria && p.id !== productoActual.id)
        .slice(0, 4);

    contenedor.innerHTML = '';

    relacionados.forEach(p => {
        const articulo = document.createElement('article');
        articulo.className = 'product-card';
        articulo.innerHTML = `
            <a href="detalle-producto.html?id=${p.id}">
                <img src="${p.imagen}" alt="${p.nombre}">
            </a>
            <a href="detalle-producto.html?id=${p.id}" class="product-title">${p.nombre}</a>
            <p class="product-price">$${p.precio.toLocaleString('es-CL')}</p>
        `;
        contenedor.appendChild(articulo);
    });
}