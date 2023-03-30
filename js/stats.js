const { createApp } = Vue;
const app = createApp({
    data() {
        return {
        mostAttendance: '',
        lowestAttendance: '',
        LargeCapacity: '',
        Category:[],
        eventos:[],
        eventosPasados:[],
        eventosFuturos:[],
        revenues: 0,
        percentageAttendance: 0,
        categoria: '',

        }
    }
    ,created(){
        fetch('../data/amazing.json')
        .then(response => response.json())
        .then(data => {
            this.eventos = data.events;
            this.eventosPasados= this.targetpast(data);
            this.eventosFuturos= this.targetFuture(data);
            this.theMostAttendance(this.eventos);
            this.theLowestAttendance(this.eventos);
            this.theLargeCapacity(this.eventos);
            this.traerCategory(this.eventos);
        }
        )
        .catch(error => console.log(error));
    },
    methods: {
        theMostAttendance(eventos){
            this.mostAttendance = eventos.reduce((prev, current) => (
                ((prev.assistance?prev.assistance : prev.estimate)/prev.capacity*100 > 
                (current.assistance?current.assistance : current.estimate)/current.capacity*100) ? prev : current)).name;
        },
        theLowestAttendance(eventos){
            this.lowestAttendance = eventos.reduce((prev, current) => 
            ((prev.assistance?prev.assistance : prev.estimate)/prev.capacity*100 < 
            (current.assistance?current.assistance : current.estimate)/current.capacity*100) ? prev : current).name;
        },
        theLargeCapacity(eventos){
            this.LargeCapacity = eventos.reduce((prev, current) => 
            ((prev.capacity > current.capacity) ? prev : current)).name;
        },
        targetpast(myData) {
            return myData.events.filter((event) => event.date < myData.currentDate);
          },
        targetFuture(myData) {
            return myData.events.filter((event) => event.date > myData.currentDate);
            },
        traerCategory(eventos){
            this.Category = eventos.map((item) => item.category);
            let setCategory = new Set(this.Category)
            this.Category = Array.from(setCategory)  
        },
        calculatorRevenues(category,array){
            this.revenues = 0;
            let filtro= array.filter((item) => item.category === category);
            filtro.forEach(event => {
            this.revenues += (event.assistance ? event.assistance : event.estimate) * event.price;
            });      
        }
        ,calculatorPercentageAttendance(category, array){
            let attendance = 0;
            let capacity = 0;
            let filtro= array.filter((item) => item.category === category);
            filtro.forEach(event => {
            capacity += event.capacity;
            attendance += event.assistance ? event.assistance : event.estimate
            });
            this.percentageAttendance = ((attendance/capacity)*100).toFixed(2);
        },
    }
    ,computed: {
    }
}).mount('#app')



