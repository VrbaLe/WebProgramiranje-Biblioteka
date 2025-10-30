import { Application } from "./application.js";

let bibliotekeFetch = await fetch("https://localhost:7080/Ispit/VratiBiblioteke()").then(response=>response.json());

let app= new Application(bibliotekeFetch);
app.draw(document.body);