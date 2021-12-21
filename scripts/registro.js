let formulario = document.getElementById('form_registro');

let usuarios = JSON.parse(localStorage.getItem('Registros')) || [];

formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturaInformacion();
    e.target.reset()
})

const capturaInformacion = () => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let correo = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;
    let contraseña_v = document.getElementById('password_v').value;
    let telefono = document.getElementById('telefono').value;

    if (contraseña !== contraseña_v){
        Swal.fire({
            title: 'Las contraseñas no coinciden',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    }

    let registro = {
        nombre,
        apellido,
        correo,
        contraseña,
        telefono
    }

    usuarios.unshift(registro);
    guardarDatos();
}

const guardarDatos = () => {
    localStorage.setItem('Registros', JSON.stringify(usuarios));

}

