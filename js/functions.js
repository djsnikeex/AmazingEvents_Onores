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
      <div class="card h-100 w-100 border d-flex flex-grow-3 ">
        <img src="${tarjeta.image}"
          class="card-img-top h-50"
          width="100" alt="${tarjeta.category}">
        <div class="card-body align-text-top w-100 d-flex flex-column flex-grow-3 ">
          <h5 class="card-title text-bolder text-center d-flex justify-content-center flex-grow-3">${tarjeta.name}</h5>
          <p class="card-text text-center ">${tarjeta.description}</p>
        </div>
        <div class="card-footer d-flex  d-flex justify-self-end">
        <a href="djsnikeex.github.io/AmazingEvents_Onores/pages/details.html?id=${tarjeta.id}" class="btn btn-primary w-100 border text-center " >View details</a>
        </div>
      </div>
      
      `
    fragmento.appendChild(div);
  }
  container.appendChild(fragmento);
  }

  export function filtrarBusqueda(array, busqueda){
    return array.filter((item) => (item.name.toLowerCase().includes(busqueda.toLowerCase()))) ;
  }

  export function createcardDetails(evento, container){
    let fragmento = document.createDocumentFragment();
    let div = document.createElement('div');
      div.classList='card bg-secondary mb-3 border border-2';
      div.innerHTML=`
          <div class="row g-0">
            <div class="col-md-5">
              <img src="${evento.image}"
                class="img-fluid rounded-start"
                alt="image-example" id="imagen-data">
            </div>
            <div class="col-md-7 ">
              <div class="card-body border-start ">
            <dl class="card-list">
              <dt><h3>${evento.name}</h3></dt><dd></dd>    
              <dt>Date:</dt><dd>${evento.date}</dd>
              <dt>Description:</dt><dd>${evento.description}</dd>
              <dt>Category:</dt><dd>${evento.category}</dd>
              <dt>Place:</dt><dd>${evento.place}</dd>
              <dt>Capacity:</dt><dd>${evento.capacity}</dd>
              <dt>${evento.assistance ? "Asistence" : "Estimate"}</dt>
              <dd>${evento.assistance ? evento.assistance : evento.estimate}</dd>
              <dt>Price $:</dt><dd>${evento.price}</dd>
            </dl>
                <a href="javascript:history.back()" class="btn btn-primary w-100 border text-center " >Back</a>
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
                class="img-fluid rounded-start"
                alt="image-example" id="imagen-data">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title text-center">Search not found</h3>
                <h4 class="text-center"> Correct your search <h5>
              </div>
            </div>  
          </div>
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

  export function drawTableForCategory(container,array){
    let Category = traerCategory(array);
    let table = '';
    Category.forEach(category => {
        let events = array.filter((item) => item.category === category);
        let revenues = calculatorRevenues(events);
        let percentageAttendance = calculatorPercentageAttendance(events);
        table += `<tr>
        <td>${category}</td>
        <td>$${revenues}</td>
        <td>${percentageAttendance}%</td>
        </tr>`
    });
    container.innerHTML = table;


}


export function traerCategory(array){
    let Category = array.map((item) => item.category);
    let setCategory = new Set(Category)
    Category = Array.from(setCategory)
    return Category;
}

export function calculatorRevenues(array){
    let revenues = 0;
    array.forEach(event => {
        revenues += (event.assistance ? event.assistance : event.estimate) * event.price;
    });
    return revenues;
}

export function calculatorPercentageAttendance(array){
    let attendance = 0;
    let capacity = 0;
    array.forEach(event => {
        capacity += event.capacity;
        attendance += event.assistance ? event.assistance : event.estimate
    });
    return ((attendance/capacity)*100).toFixed(2);
}

export function drawEventsStats(container,array){
   let events = array.events;
   let table ='';
    let mostAttendance = events.reduce((prev, current) => (
      ((prev.assistance?prev.assistance : prev.estimate)/prev.capacity*100 > 
      (current.assistance?current.assistance : current.estimate)/current.capacity*100) ? prev : current));
  
    let lowestAttendance =(events.reduce((prev, current) => 
    ((prev.assistance?prev.assistance : prev.estimate)/prev.capacity*100 < 
    (current.assistance?current.assistance : current.estimate)/current.capacity*100) ? prev : current));

    let largeCapacity = events.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current);
    table += `<tr>
    <td>${mostAttendance.name}</td>
    <tr>
    <td>${lowestAttendance.name}</td>
    </tr>
    <tr>
    <td>${largeCapacity.name}</td>
    </tr>`
    container.innerHTML = table;
}

export function filtrarCategory(array){
  let category= Array.from(document.querySelectorAll('input[type="checkbox"]'));
  category = category.filter(check => check.checked)
  category = category.map(check => check.value)
  let categoriasFiltradas = array.filter((evento) => category.includes(evento.category));
  if(categoriasFiltradas.length>0){
      return categoriasFiltradas
  }
  return array;
}

export function filtroConjunto(array,container,busquedaInput){
  let eventosFiltrados= filtrarCategory(array)
  eventosFiltrados = filtrarBusqueda(eventosFiltrados, busquedaInput.value)
  createcard(eventosFiltrados, container)
}