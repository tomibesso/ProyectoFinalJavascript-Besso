let valorMetroCuadrado = 500;
let manoDeObra = 1.25;
let riegos = []; // almacena varios valores de riegos

let form = document.getElementById('formulario');

form.addEventListener('submit', agregarRiego);

function agregarRiego(event) {
    event.preventDefault();

    let formRiego = event.target.children;

    let medidasRiego = {
        largo: formRiego[0].value,
        ancho: formRiego[1].value,
        area: formRiego[0].value * formRiego[1].value,
        precio: ((formRiego[0].value * formRiego[1].value) + valorMetroCuadrado) * manoDeObra
    }

    let nuevoRiego = document.createElement('li');
    nuevoRiego.innerText = `Largo: ${medidasRiego.largo}Mts. Ancho: ${medidasRiego.ancho}Mts. Area: ${medidasRiego.area}M2. Precio: $${medidasRiego.precio}Ars.`;

    document.querySelector('#riegos').append(nuevoRiego);

    riegos.push(medidasRiego);

    document.getElementById('borrar').click();
}

let btnGuardarRiegos = document.getElementById('guardarRiegos');

btnGuardarRiegos.onclick = ()=>{
    sessionStorage.setItem('listaRiegos', JSON.stringify(riegos));

    Toastify ({
        text: 'Guardado exitosamente!',
        duration: 1500,
        style: {
            background: 'rgb(65, 152, 7)',
            fontFamily: 'sans-serif',
            borderRadius: '10px'
        }
    }).showToast();
}

let btnCotizar = document.getElementById('cotizar');

btnCotizar.addEventListener('click', ()=> {
    Toastify({
        text: 'Felicidades, cotizaste un nuevo riego!',
        duration: 3000,
        style: {
            background: 'rgb(65, 152, 7)',
            fontFamily: 'sans-serif',
            borderRadius: '10px'
        }
    }).showToast();
})

let btnBorrarUltimo = document.getElementById('borrarUltimo');

btnBorrarUltimo.onclick = ()=>{
    if (riegos.length > 0) {
        riegos.pop();
        actualizarLista();
    }
}

function actualizarLista() {
    let listaRiegos = document.querySelector('#riegos');
    listaRiegos.innerHTML = '';

    riegos.forEach((medidaRiego) => {
        let nuevoRiego = document.createElement('li');
        nuevoRiego.innerText = `Largo: ${medidaRiego.largo}, Ancho: ${medidaRiego.ancho}, Area: ${medidaRiego.area}`;
        listaRiegos.append(nuevoRiego);
    });
}



// guardar datos del cliente

let cliente = [];

let formCliente = document.getElementById('formDatosPersonales');

formCliente.addEventListener('submit', agregarCliente);

function agregarCliente(event) {
    event.preventDefault();

    let valoresCliente = event.target.children[0].children;

    let datosCliente = {
        nombre: valoresCliente[0].value,
        apellido: valoresCliente[1].value,
        telefono: valoresCliente[2].value,
        correo: valoresCliente[3].value
    }

    cliente.push(datosCliente);

    document.getElementById('borrarDatosPersonales').click();

    localStorage.setItem('listaClientes', JSON.stringify(cliente));
}

// ver opcion cuotas y realizar el calculo en base a la eleccion para mostrar en la lista de riegos cotizados.