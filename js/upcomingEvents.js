import data from "../amazing.js";
import { targetFuture, createcard, filtrarBusqueda,createCheckBox } from "./functions.js";

const manTarjetas= document.getElementById('tarjetas')
const busquedaInput = document.getElementById('busqueda');
const categorias = document.getElementById('categorias')
let eventosFuturos = targetFuture(data)

createCheckBox(eventosFuturos, categorias);
createcard(eventosFuturos, manTarjetas);

categorias.addEventListener('change', filtroConjunto);

busquedaInput.addEventListener('input',filtroConjunto);


function filtroConjunto(){
    let eventosFiltrados= filtrarCategory(eventosFuturos)
    eventosFiltrados = filtrarBusqueda(eventosFiltrados, busquedaInput.value)
    createcard(eventosFiltrados, manTarjetas)
}
function filtrarCategory(array){
    let category= Array.from(document.querySelectorAll('input[type="checkbox"]'));
    category = category.filter(check => check.checked)
    category = category.map(check => check.value)
    let categoriasFiltradas = array.filter((evento) => category.includes(evento.category));
    if(categoriasFiltradas.length>0){
        return categoriasFiltradas
    }
    return array;
}

