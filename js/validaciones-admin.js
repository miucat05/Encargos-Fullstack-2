function validarRun(runSucio) {
    const run = runSucio.replace(/[.\-]/g, "").toUpperCase();

    if (run.length < 7 || run.length > 9) return false;
    if (!/^[0-9]+[0-9K]$/.test(run)) return false;

    const cuerpo = run.slice(0, -1);
    const dvIngresado = run.slice(-1);

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length -1; i>=0; i--) {
        suma += Number(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo +1;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

    return dvIngresado === dvEsperado;
}

function validarCorreoInstitucional(correo) {
    const regex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(correo.trim());
}

function mostrarError(idError, mensaje){
    const el = document.getElementById(idError);
    if (el) el.textContent = mensaje;
}

function limpiarError(idError){
    mostrarError(idError, "");
}