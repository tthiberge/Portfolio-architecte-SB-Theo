console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin
import { getWorksData, getCategoriesData } from "./api-fetch.js";
import { displayGridWorks, displayFilters, displayModifyIfConnected, displayLogoutIfConnected, removeFiltersIfConnected, removeModify, removeLogout } from "./displayElement.js";
import { setFilterListener, setLogoutListnenerfromHomepage,  } from "./listeners.js";
import { setModal, displayGridWorksInModal, setListenerZoomIcon, displayBottomOfModal, setListenerTrashIcon } from "./modal.js";


// Afficher les boutons modifier sur la page projet si connecté (= si token présent en local storage)
displayModifyIfConnected()
displayLogoutIfConnected()
// removeFiltersIfConnected()

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

// Mettre en place la modal
const modal = document.getElementById('simpleModal');
setModal(modal)

// Populer la modal + mettre listener hover 2ème icon
displayGridWorksInModal(worksData)
const modalFigures = document.querySelectorAll(".figure-work")
setListenerZoomIcon(modalFigures)
const modalContent = document.querySelector(".modal-content")
displayBottomOfModal(modalContent)
setListenerTrashIcon(modalContent)


const modalContent2 = document.querySelector(".modal-content-2")
const btnAddPicture = modalContent.querySelector(".modal-add-picture")
const btnArrowBack = document.querySelector(".arrowBackBtn")

btnAddPicture.addEventListener("click", function() {
  console.log("go");
  modalContent2.classList.remove("hidden")
  modalContent.classList.add("hidden")

  const categoriesFormSection = document.getElementById("categorie")
  const categoriesNames = categoriesData.map(category => category.name)


  const pleaseSelect = document.createElement("option")
  pleaseSelect.innerText = "Please select a category"
  pleaseSelect.disabled = true
  pleaseSelect.selected = true
  categoriesFormSection.appendChild(pleaseSelect)


  categoriesNames.forEach(categoryName => {
    const category = document.createElement("option")
    category.innerText = categoryName
    categoriesFormSection.appendChild(category)
    console.log(category);
  })

})

btnArrowBack.addEventListener("click", function() {
  console.log("back");
  modalContent.classList.remove("hidden")
  modalContent2.classList.add("hidden")

})
