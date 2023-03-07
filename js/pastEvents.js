import data from '../amazing.js';


function traerPast(){
  let eventosPasadosAux=[];
    for(let i=0;i<data.events.length;i++){
        if(data.events[i].date<data.currentDate){
            eventosPasadosAux.push(data.events[i])
        }
    }
    return eventosPasadosAux;
}
const manTarjetas= document.getElementById('tarjetas')
let fragmento = document.createDocumentFragment();
let eventosPasados = traerPast()


for (const tarjeta of eventosPasados) {
  let div = document.createElement('div');
  div.classList='col-lg-3 col-sm-6';
  div.innerHTML=`
    <div class="card w-100 h-100 bg-secondary">
      <img src="${tarjeta.image}"
        class="card-img-top"
        width="100" alt="${tarjeta.category}">
      <div class="card-body h-50 w-100">
        <h5 class="card-title text-center">${tarjeta.name}</h5>
        <h6 class="card-text text-center">${tarjeta.category}</h6>
        <p class="card-text text-center">${tarjeta.date}</p>
        <h6 class="card-text text-center bold">$ ${tarjeta.price}</h6>
        <a href="../pages/details.html" class="btn btn-primary w-100 border text-center" >Ver detalles</a>
      </div> 
    </div>
  </div>`
  fragmento.appendChild(div);
}

manTarjetas.appendChild(fragmento);
