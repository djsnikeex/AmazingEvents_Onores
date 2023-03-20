import { targetFuture, createcard,createCheckBox,filtroConjunto} from "./functions.js";

const manTarjetas= document.getElementById('tarjetas')
const busquedaInput = document.getElementById('busqueda');
const categorias = document.getElementById('categorias')

async function iniciar(){
    fetch('../data/amazing.json')
                .then(response => response.json())
                .then(data => {
                    let eventosFuturos = targetFuture(data)
                    createCheckBox(eventosFuturos, categorias);
                    createcard(eventosFuturos, manTarjetas);
                    categorias.addEventListener('change', () =>
                    filtroConjunto(eventosFuturos,manTarjetas,busquedaInput));
                    busquedaInput.addEventListener('input',() =>
                    filtroConjunto(eventosFuturos,manTarjetas,busquedaInput));
                })
                .catch(error => console.log(error));
            }
await iniciar();



