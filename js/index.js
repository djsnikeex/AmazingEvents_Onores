import { createcard,createCheckBox,filtroConjunto} from '../js/functions.js'

const manTarjetas= document.getElementById('tarjetas')
const busquedaInput = document.getElementById('busqueda')
const categorias = document.getElementById('categorias')

async function iniciar(){
    await fetch('./data/amazing.json')
                .then(response => response.json())
                .then(data => {
                    let eventosCompleto = data.events
                    createCheckBox(eventosCompleto, categorias)
                    createcard(eventosCompleto, manTarjetas)
                    categorias.addEventListener('change', () =>
                    filtroConjunto(eventosCompleto,manTarjetas,busquedaInput))
                    busquedaInput.addEventListener('input',() =>
                    filtroConjunto(eventosCompleto,manTarjetas,busquedaInput))
                })
                .catch(error => console.log(error))
};
  iniciar();

