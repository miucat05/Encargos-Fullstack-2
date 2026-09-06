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
} else {
    console.error('Producto no encontrado');
}
