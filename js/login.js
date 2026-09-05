const botonToggle = document.getElementById('toggle-contrasena');
const inputContrasena = document.getElementById('contrasena');

botonToggle.addEventListener('click', () => {
    const esPassword = inputContrasena.type === 'password';
    inputContrasena.type = esPassword ? 'text' : 'password';
    botonToggle.textContent = esPassword ? 'Ocultar' : 'Ver';
});