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