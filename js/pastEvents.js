import {targetpast, createcard, filtroConjunto,createCheckBox} from './functions.js';

const manTarjetas= document.getElementById('tarjetas')
const busquedaInput = document.getElementById('busqueda');
const categorias = document.getElementById('categorias')

async function iniciar(){
    fetch('../data/amazing.json')
                .then(response => response.json())
                .then(data => {
                    let eventosPasados = targetpast(data)
                    createCheckBox(eventosPasados, categorias);
                    createcard(eventosPasados, manTarjetas);
                    categorias.addEventListener('change', () =>
                    filtroConjunto(eventosPasados,manTarjetas,busquedaInput));
                    busquedaInput.addEventListener('input',() =>
                    filtroConjunto(eventosPasados,manTarjetas,busquedaInput));
                })
                .catch(error => console.log(error));
            }
await iniciar();





