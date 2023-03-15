import { createcardDetails } from "../js/functions.js";
import data from "../amazing.js";

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const tarjeta = data.events.find((evento) => evento.id == id);
const div = document.getElementById('tarjeta');

createcardDetails(tarjeta, div);
