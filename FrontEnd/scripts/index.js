console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin
import { getWorksData, getCategoriesData } from "./api-fetch.js";
import { displayGridWorks, displayFilters, displayModifyIfConnected, displayLogoutIfConnected, removeFiltersIfConnected, removeModify, removeLogout } from "./displayElement.js";
import { setFilterListener, setLogoutListnenerfromHomepage } from "./listeners.js";


// Afficher les boutons modifier sur la page projet si connecté (= si token présent en local storage)
displayModifyIfConnected()
displayLogoutIfConnected()
removeFiltersIfConnected()

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
setLogoutListnenerfromHomepage (removeModify, removeLogout)
