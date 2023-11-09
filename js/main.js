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

    if (Number(formRiego[0].value) && Number(formRiego[1].value)) {
        let nuevoRiego = document.createElement('li');
        nuevoRiego.innerText = `Largo: ${medidasRiego.largo}Mts. - Ancho: ${medidasRiego.ancho}Mts. - Area: ${medidasRiego.area}M2. - Precio: $${medidasRiego.precio}Ars.`;
    
        document.querySelector('#riegos').append(nuevoRiego);
    
        riegos.push(medidasRiego);
    
        document.getElementById('borrar').click();
    }
}

let btnGuardarRiegos = document.getElementById('guardarRiegos');

btnGuardarRiegos.onclick = ()=>{
    const valorInput1 = document.getElementById('largoTerreno').value;
    const valorInput2 = document.getElementById('anchoTerreno').value;

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

let btnCotizar = document.getElementById('cotizar');

btnCotizar.addEventListener('click', ()=> {
    const valorInput1 = document.getElementById('largoTerreno').value;
    const valorInput2 = document.getElementById('anchoTerreno').value;

    if (Number(valorInput1) && Number(valorInput2)) {
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
})

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

    riegos.forEach((medidaRiego) => {
        let nuevoRiego = document.createElement('li');
        nuevoRiego.innerText = `Largo: ${medidaRiego.largo}, Ancho: ${medidaRiego.ancho}, Area: ${medidaRiego.area}, Precio: ${medidaRiego.precio}Ars.`;
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

    let listaClientes = JSON.parse(localStorage.getItem('listaClientes')) || [];

    function clienteExiste(clienteNuevo, listaClientes) {
        return listaClientes.some(function (clienteExistente) {
            return (
                clienteExistente.nombre === clienteNuevo.nombre &&
                clienteExistente.apellido === clienteNuevo.apellido &&
                clienteExistente.telefono === clienteNuevo.telefono &&
                clienteExistente.correo === clienteNuevo.correo
            );
        });
    }

    if (clienteExiste(datosCliente, listaClientes)) {
        Swal.fire({
            title: '¡Ya existe!',
            text: 'El cliente ya se registró anteriormente',
            icon: 'info',
            confirmButtonText: 'OK'
          })
    } else {
        listaClientes.push(datosCliente);
        localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
        Swal.fire({
            title: '¡Cliente registrado!',
            text: 'El cliente ha sido registrado con éxito. En breve nos pondremos en contacto contigo.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
    }

    document.getElementById('borrarDatosPersonales').click();
}

// usar fetch post para enviar los clientes a un archivo json

emailjs.init("eyPu-i_puaahmtEzd");

document.getElementById('guardarDatosPersonales').addEventListener('click', function (e) {
    e.preventDefault();

    const datosFormulario = {};
    const inputs = document.querySelectorAll('.formDatosPersonales_inputs input');
  
    inputs.forEach(input => {
        datosFormulario[input.id] = input.value;
    });

    enviarMail(datosFormulario);
});

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
        telefono: telefono
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
        alert('Correo enviado con éxito');
      } else {
        alert('Error al enviar el correo');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
// ver opcion cuotas y realizar el calculo en base a la eleccion para mostrar en la lista de riegos cotizados