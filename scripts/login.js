let formulario = document.getElementById('formulario-uyc');

let registros = JSON.parse(localStorage.getItem('Registros')) || []

formulario.addEventListener('submit', e => {
    e.preventDefault();
    tomarDatos();
    e.target.reset()
})

const tomarDatos = () => {
    let usuario = document.getElementById('usuario').value;
    let contraseñal = document.getElementById('passwordl').value;

    compararDatos(usuario, contraseñal)
}

const compararDatos = (user, psswd) => {
    let mensaje = ''
    let cont = 0

    if (user === '' || psswd === '') {
        mensaje = "Este campo no puede estar vacio"
    }
    else {

        registros.forEach((registro, index) => {
            const { correo, contraseña } = registro;

            if (correo === user) {
                if (psswd === contraseña) {
                    mensaje = "Validado"
                }
                else {
                    mensaje = "Usuario y contraseña no coinciden";
                }
            }
            else {
                cont += 1
            }

            if (cont === registros.length) {
                mensaje = "Correo invalido"
            }

        });
    }

    validarAcceso(mensaje)
}

const validarAcceso = (mensaje) => {

    if (mensaje === "Validado") {
        window.location = "./ingreso.html"
    }
    else {
        Swal.fire({
            title: mensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    }
}