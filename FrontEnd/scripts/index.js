console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin
import { getWorksData } from "./api-fetch.js";
import { displayGridWorks } from "./createHTMLElement.js";

// Récupérer mes travaux
let worksData = await getWorksData()
console.log(worksData);

// Afficher la grille de travaux sur la homepage
displayGridWorks(worksData)

