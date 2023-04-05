const { createApp } = Vue
const app = createApp({
    data() {
        return {
            eventos: [],
            categorySelect: [],
            category: [],
            busqueda: '',
            filtro: []

        }
    }
    ,created(){
        fetch('../data/amazing.json')
        .then(response => response.json())
        .then(data => {
            this.eventos = data.events;
            this.category = Array.from(new Set(this.eventos.map(evento => evento.category)));
            this.filtro = this.eventos;
        })
        .catch(error => console.log(error));

    },
    mounted(){

    },
    methods:{
       

        
    }
    ,computed: {
        superFiltro(){
            let primerFiltro = this.eventos.filter(evento => evento.name.toLowerCase().includes(this.busqueda.toLowerCase()))
            if(!this.categorySelect.length){
                this.filtro = primerFiltro
            } else {
                this.filtro = primerFiltro.filter(evento => this.categorySelect.includes(evento.category))
            }
        }
    }}
    
).mount('#app');

