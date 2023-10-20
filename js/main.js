let valorMetroCuadrado = 500;
let manoDeObra = 1.25;
let riegos = []; // almacena varios valores de riegos

let form = document.getElementById('formulario');

form.addEventListener('submit', agregarRiego);

function agregarRiego(event) {
    event.preventDefault();

    let formulario = event.target.children;

    let medidasRiego = {
        largo: formulario[0].value,
        ancho: formulario[1].value,
        area: formulario[0].value * formulario[1].value,
        precio: ((formulario[0].value * formulario[1].value) + valorMetroCuadrado) * manoDeObra
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
}

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