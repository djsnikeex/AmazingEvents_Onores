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