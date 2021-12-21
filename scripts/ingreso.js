let formulario = document.getElementById('formulario');
let listarCita = document.getElementById('listarCitas');
let buscar = document.getElementById('btnBuscar');
let busqueda = document.getElementById('busqueda');

let citas = JSON.parse(localStorage.getItem('Citas')) || [];


formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturaDatos();
    e.target.reset()
})

const capturaDatos = () => {
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let sintomas = document.getElementById('sintomas').value;

    let registro = {
        nombre,
        fecha,
        hora,
        sintomas
    }

    citas.unshift(registro);
    guardarDatos();

}

const guardarDatos = () => {
    localStorage.setItem('Citas', JSON.stringify(citas));
    getLocalStorage();
}

const getLocalStorage = () => {
    listarCita.innerHTML = ''
    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'));

    citasLocalStorage?.map(cita => {
        const { nombre, fecha, hora, sintomas } = cita;
        listarCita.innerHTML += `
                <tr>
                    <td>${nombre}</td>
                    <td>${fecha}</td>
                    <td>${hora}</td>
                    <td>${sintomas}</td>
                    <td style="cursor:pointer" class="material-icons">delete</td>
                </tr>              
        `
    })
}

buscar.addEventListener('click', e => {
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Citas'));
    let filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase())

    busqueda.innerHTML = '';

    filtro.length === 0 
        ?
        busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>`
        :
        filtro.map(cita => {
        const { nombre, fecha, hora, sintomas } = cita;
        busqueda.innerHTML += `
                            <div style="color:white;">${nombre}</div>
                            <div style="color:white;">${fecha}</div>
                            <div style="color:white;">${hora}</div>
                            <div style="color:white;">${sintomas}
                                <button id="btnBorrar">Borrar</Button>
                            </div><br>             
                            `
        })

        let borrar = document.getElementById('btnBorrar');

        borrar.addEventListener('click', e =>{
            e.preventDefault();
            busqueda.innerHTML = ''
        })
    })


document.addEventListener('DOMContentLoaded', getLocalStorage);

listarCita.addEventListener('click', (e) =>{
    let texto = e.path[1].childNodes[1].innerHTML;

      if(e.target.innerHTML === 'delete'){
            eliminarDatos(texto);

       }
})

const eliminarDatos = (usuario) => {

    let indice;    
    console.log(usuario)

    citas.forEach((elemento, index) => {
        console.log(elemento.nombre)
        if(elemento.nombre === usuario){
            indice = index;
        }
    })

    citas.splice(indice, 1);
    console.log(citas)
    guardarDatos();

 }