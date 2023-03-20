import { targetpast,targetFuture, drawEventsStats,drawTableForCategory} from '../js/functions.js';

let Upcoming = document.getElementById('Upcoming');
let PastEvents = document.getElementById('PastEvents');
let Stats = document.getElementById('Stats');

async function iniciar(){
    fetch('../data/amazing.json')
                .then(response => response.json())
                .then(data => {
                    drawEventsStats(Stats,data)
                    drawTableForCategory(PastEvents,targetpast(data));
                    drawTableForCategory(Upcoming,targetFuture(data));
                })
                .catch(error => console.log(error));
            }
await iniciar();



