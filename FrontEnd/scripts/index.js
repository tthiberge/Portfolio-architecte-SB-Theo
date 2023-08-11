console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin
import { getWorksData, getCategoriesData } from "./api-fetch.js";
import { displayGridWorks, displayFilters } from "./displayElement.js";
import { setFilterListener } from "./listeners.js";

// Récupérer mes travaux
let worksData = await getWorksData()
console.log(worksData);

// Afficher la grille de travaux sur la homepage
displayGridWorks(worksData)


// Récupérer les catégories
let categoriesData = await getCategoriesData()
console.log(categoriesData);

// Afficher les filtres
displayFilters(categoriesData)


// Déployer les eventlisteners sur tous ces boutons

setFilterListener(displayGridWorks, worksData);


// const filterItems = document.querySelectorAll(".filters button")


// for (let i = 0; i < filterItems.length; i++) {
//   const filterItem = filterItems[i];

//   filterItem.addEventListener("click", function (event) {
//     // Boucle pour réinitialiser les couleurs de tous les filtres à vert sur blanc
//     for (let i = 0; i < filterItems.length; i++) {
//       filterItems[i].classList.remove("filters-clicked");
//       filterItems[i].classList.add("filters-unclicked");
//     }

//     // Pour le filtre sur lequel je viens de cliquer, je mets blanc sur vert
//     filterItem.classList.remove("filters-unclicked")
//     filterItem.classList.add("filters-clicked")

//     if (event.target.innerText === "Tous") {
//       displayGridWorks(worksData)

//     } else {
//       const worksFiltered = worksData.filter(function (work) {
//         return work.category.name === event.target.innerText
//       })
//       displayGridWorks(worksFiltered)
//     }

//   })
// }




// Vérifier que les categories et travaux récupérés sont connectés
// console.log(worksData[0].category.name);
