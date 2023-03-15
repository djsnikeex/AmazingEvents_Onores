export function targetpast(myData) {
    return myData.events.filter((event) => event.date < myData.currentDate);
  }

export function targetFuture(myData){
    return myData.events.filter((event) => event.date > myData.currentDate);
}

export function createcard(eventos, container){
  if(eventos.length==0){
    container.innerHTML='';
    PageNotFound(container)
    return
  }
    let fragmento = document.createDocumentFragment();
    container.innerHTML='';
    for (const tarjeta of eventos) {
      let div = document.createElement('div');
      div.classList='col-lg-3 col-sm-6 d-flex';
      div.innerHTML=`
      <div class="card h-100 w-100 border d-flex">
        <img src="${tarjeta.image}"
          class="card-img-top h-50"
          width="100" alt="${tarjeta.category}">
        <div class="card-body align-text-top w-100 d-flex flex-column  ">
          <h5 class="card-title text-bolder text-center d-flex justify-content-center">${tarjeta.name}</h5>
          <p class="card-text text-center ">${tarjeta.description}</p>
        </div>
        <div class="card-footer d-flex  d-flex justify-self-end">
        <a href="../pages/details.html?id=${tarjeta.id}" class="btn btn-primary w-100 border text-center " >Ver detalles</a>
        </div>
      </div>
      
      `
    fragmento.appendChild(div);
  }
  container.appendChild(fragmento);
  }

  export function filtrarBusqueda(array, busqueda){
    return array.filter((item) => (item.name.toLowerCase().includes(busqueda.toLowerCase()))||(item.category.toLowerCase().includes(busqueda.toLowerCase()))) ;
  }

  export function createcardDetails(evento, container){
    let fragmento = document.createDocumentFragment();
    let div = document.createElement('div');
      div.classList='card bg-secondary mb-3 border border-2';
      div.innerHTML=`
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${evento.image}"
                class="img-fluid rounded-start"
                alt="image-example" id="imagen-data">
            </div>
            <div class="col-md-8 ">
              <div class="card-body border-start">
                <h4 class="card-title text-center text-bolder">${evento.name}</h4>
                <ul>
                  <li>Name: ${evento.name} </li>
                  <li>Date: ${evento.date}</li>
                  <li>Description: ${evento.description}</li>
                  <li>Category: ${evento.category}</li>
                  <li>Place: ${evento.place}</li>
                  <li>Capacity: ${evento.capacity}</li>
                  <li>Assistance: ${evento.assistance}</li>
                  <li>Price: $${evento.price}</li>
                </ul>
                <a href="../index.html" class="btn btn-primary w-100 border text-center " >Volver al inicio</a>
              </div>
              
            </div>
            
          </div>

          
        
    `
    fragmento.appendChild(div);
    container.appendChild(fragmento);
  }

  export function PageNotFound(container){
    let fragmento = document.createDocumentFragment();
    let div = document.createElement('div');
      div.classList='card bg-secondary mb-3';
      div.innerHTML=`
          <div class="row g-0">
            <div class="col-md-4">
              <img src="../assets/img/searchNotFound.png"
                class="img-fluid rounded-start;"
                alt="image-example" id="imagen-data">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title text-center">No encontramos tu busqueda </h3>
                <h5 class="text-center"> Intenta corregir tu busqueda <h5>
              </div>
            </div>  
          </div>
          <a href="../index.html" class="btn btn-primary w-100 border my-2 text-center  " >Volver al inicio</a>
    `
    fragmento.appendChild(div);
    container.appendChild(fragmento);
  }

  export function createCheckBox(array, container){
    let arrayCheckbox = array.map((item) => item.category);
    let setCheckbox = new Set(arrayCheckbox)
    arrayCheckbox = Array.from(setCheckbox)
    let checkboxes = ''
    arrayCheckbox.forEach(category => {
        checkboxes += `<div class="form-check">
        <label class="form-check-label">
          ${category}
          <input class="form-check-input" type="checkbox"
            value="${category}"
            id=" ${category}">
        </label>
      </div>`
    })
    container.innerHTML = checkboxes;
  }