/* import { createcardDetails } from "../js/functions.js";

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

async function iniciar(){
    fetch('../data/amazing.json')
                .then(response => response.json())
                .then(data => {
                    const tarjeta = data.events.find((evento) => evento.id == id);
                    const div = document.getElementById('tarjeta');
                    createcardDetails(tarjeta, div);
                })
                .catch(error => console.log(error));
            }
await iniciar();
 */


const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            eventos: [],
            evento: [],
            

        }
    }
    ,created(){
        fetch('../data/amazing.json')
        .then(response => response.json())
        .then(data => {
            const queryString = location.search;
            const params = new URLSearchParams(queryString);
            const id = params.get('id');
            this.evento = data.events.find((evento) => evento.id == id);
        }
        )
        .catch(error => console.log(error));
    }}).mount('#app')