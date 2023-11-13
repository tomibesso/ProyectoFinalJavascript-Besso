let valorMetroCuadrado = 500;
let manoDeObra = 1.25;
let riegos = []; // almacena varios valores de riegos

let form = document.getElementById('formulario');

form.addEventListener('submit', agregarRiego);

function agregarRiego(event) {
    event.preventDefault();

    let formRiego = event.target.children;

    let seleccionCuotas = document.getElementsByClassName('opcionCuotas_lista')[0];
    let valorCuota = seleccionCuotas.value;

    let medidasRiego = {
        largo: formRiego[0].value,
        ancho: formRiego[1].value,
        area: formRiego[0].value * formRiego[1].value,
        precio: ((formRiego[0].value * formRiego[1].value) + valorMetroCuadrado) * manoDeObra,
        precioEnCuotas: (((formRiego[0].value * formRiego[1].value) + valorMetroCuadrado) * manoDeObra) / valorCuota
    }

    if (Number(formRiego[0].value) && Number(formRiego[1].value)) {
        let nuevoRiego = document.createElement('li');
        nuevoRiego.innerText = `Largo: ${medidasRiego.largo}Mts. - Ancho: ${medidasRiego.ancho}Mts. - Area: ${medidasRiego.area}M2. - Precio: $${medidasRiego.precio.toFixed(2)}Ars. - Precio en cuotas: $${medidasRiego.precioEnCuotas.toFixed(2)}Ars en ${valorCuota} cuota/s.`;
    
        document.querySelector('#riegos').append(nuevoRiego);
        riegos.push(medidasRiego);
        document.getElementById('borrar').click();
        Toastify({
            text: '¡Felicidades, cotizaste un nuevo riego!',
            duration: 3000,
            style: {
                background: 'rgb(65, 152, 7)',
                fontFamily: 'sans-serif',
                borderRadius: '10px'
            }
        }).showToast();
    }
}

let btnGuardarRiegos = document.getElementById('guardarRiegos');

btnGuardarRiegos.onclick = ()=>{
    if (riegos.length > 0) {

        sessionStorage.setItem('listaRiegos', JSON.stringify(riegos));

        Toastify ({
            text: '¡Guardado exitosamente!',
            duration: 1500,
            style: {
                background: 'rgb(65, 152, 7)',
                fontFamily: 'sans-serif',
                borderRadius: '10px'
            }
        }).showToast();
    }
}

let btnBorrarUltimo = document.getElementById('borrarUltimo');

btnBorrarUltimo.onclick = ()=>{
    if (riegos.length > 0) {
        Swal.fire({
            title: 'Atención',
            text: 'Estas seguro que deseas borrar el ultimo riego?',
            icon: 'warning',
            confirmButtonText: 'Sí',
            showDenyButton: true,
            denyButtonText: 'No'
          }).then((result) => {
                if(result.isConfirmed) {
                    riegos.pop();
                    actualizarLista();

                    Toastify({
                        text: '¡Riego borrado!',
                        duration: 2000,
                        style: {
                            background: 'rgb(220, 63, 63)',
                            fontFamily: 'sans-serif',
                            borderRadius: '10px'
                        }
                    }).showToast();
                    }
                }
            )
    }
}

function actualizarLista() {
    let listaRiegos = document.querySelector('#riegos');
    listaRiegos.innerHTML = '';

    let seleccionCuotas = document.getElementsByClassName('opcionCuotas_lista')[0];
    let valorCuota = seleccionCuotas.value; 

    riegos.forEach((medidaRiego) => {
        medidaRiego.precioEnCuotas = (((parseFloat(medidaRiego.largo) * parseFloat(medidaRiego.ancho)) + valorMetroCuadrado) * manoDeObra) / valorCuota;

        let nuevoRiego = document.createElement('li');
        nuevoRiego.innerText = `Largo: ${medidaRiego.largo}Mts. - Ancho: ${medidaRiego.ancho}Mts. - Area: ${medidaRiego.area}M2. - Precio: $${medidaRiego.precio.toFixed(2)}Ars. - Precio en cuotas: $${medidaRiego.precioEnCuotas.toFixed(2)}Ars en ${valorCuota} cuotas.`;
        listaRiegos.append(nuevoRiego);
    });
}


// guardar datos del cliente

let cliente = [];

function agregarClienteAlLocalStorage(datosCliente) {
    let listaClientes = JSON.parse(localStorage.getItem('listaClientes')) || [];
    
    // Verifica si listaClientes es un array
    if (!Array.isArray(listaClientes)) {
        listaClientes = [];
    }
       
    function clienteExiste(clienteNuevo, listaClientes) {
        return listaClientes.some(function (clienteExistente) {
            return (
                clienteExistente.nombreCliente === clienteNuevo.nombreCliente &&
                clienteExistente.apellidoCliente === clienteNuevo.apellidoCliente &&
                clienteExistente.telefonoCliente === clienteNuevo.telefonoCliente &&
                clienteExistente.mailCliente === clienteNuevo.mailCliente
            );
        });
    }
    
    if (clienteExiste(datosCliente, listaClientes)) {
        Swal.fire({
            title: '¡Cliente Existente!',
            text: 'El cliente ya se encuentra en nuestra base de datos.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    } else {
        listaClientes.push(datosCliente);
        localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
        Swal.fire({
            title: '¡Cliente registrado!',
            text: 'El cliente ha sido registrado con éxito. En breve nos pondremos en contacto contigo.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        enviarMail(datosCliente);
        
        document.getElementById('borrarDatosPersonales').click();
    }
}

let formCliente = document.getElementById('formDatosPersonales');

formCliente.addEventListener('submit', function (event) {
    event.preventDefault();

    const datosFormulario = {};
    const inputs = document.querySelectorAll('.formDatosPersonales_inputs input');

    inputs.forEach(input => {
        datosFormulario[input.id] = input.value;
    });

    agregarClienteAlLocalStorage(datosFormulario);  
});

emailjs.init("eyPu-i_puaahmtEzd");

function enviarMail(datosFormulario) {
    const emailRemitente = datosFormulario.mailCliente;
    const emailDestinatario = 'tomi.besso12@gmail.com';
    const mensaje = datosFormulario.mensajeCliente;
    const nombre = datosFormulario.nombreCliente;
    const apellido = datosFormulario.apellidoCliente;
    const telefono = datosFormulario.telefonoCliente;

    const datosMail = {
        service_id: 'service_p2rb67d',
        template_id: 'contact_form',
        user_id: 'eyPu-i_puaahmtEzd',
        template_params: {
            from_email: emailRemitente,
            to_email: emailDestinatario,
            mensaje: mensaje,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            riegos: riegos  
        }
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosMail)
    })
        .then(response => {
            if (response.ok) {
            console.log(response);
            } else {
                console.log("Error al enviar el mail");
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar el correo. Por favor, inténtalo nuevamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }

// ver opcion cuotas y realizar el calculo en base a la eleccion para mostrar en la lista de riegos cotizados

