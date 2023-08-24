// Importer les fonctions dont j'ai besoin
import { getWorksData, getCategoriesData } from "./api-fetch.js";
import { displayGridWorks, displayFilters, displayModifyIfConnected, displayLogoutIfConnected, removeModify, removeLogout } from "./displayElement.js";
import { setFilterListener, setLogoutListnenerfromHomepage } from "./listeners.js";
import { setModal, displayGridWorksInModal, setListenerZoomIcon, displayBottomOfModal, setListenerTrashIcon, setModalsListeners, displayBottomOfModal2, imgSelectandPreview, setListenerSendWork } from "./modal.js";


// Afficher les boutons modifier sur la page projet si connecté (= si token présent en local storage)
displayModifyIfConnected()
displayLogoutIfConnected()
// removeFiltersIfConnected()

// Récupérer mes travaux
let worksData = await getWorksData()
console.log(worksData);

// Afficher la grille de travaux sur la homepage
displayGridWorks(worksData)

// Récupérer les catégories (avec option localStorage)
let categoriesData = await getCategoriesData()

// Afficher les filtres
displayFilters(categoriesData)
const categoriesIds = categoriesData.map(category => category.id)

// Déployer les eventlisteners sur tous ces boutons
setFilterListener(displayGridWorks, worksData);
setLogoutListnenerfromHomepage (removeModify, removeLogout)

// MODAL 1 + MODAL 2
// Mettre en place la modal 1
const modal = document.getElementById('simpleModal');
setModal(modal)

// Populer la modal + mettre listener hover 2ème icône
displayGridWorksInModal(worksData)
const modalFigures = document.querySelectorAll(".figure-work")
setListenerZoomIcon(modalFigures)
const modalContent = document.querySelector(".modal-content")
displayBottomOfModal(modalContent)
setListenerTrashIcon(modalContent) // Suppression - requête DELETE

// Créer la deuxième modal et gérer l'interaction entre les deux
const modalContent2 = document.querySelector(".modal-content-2")
displayBottomOfModal2(modalContent2)

const btnSendWork = document.querySelector(".modal-send-work")
const formUpload = document.getElementById("form-send-work")
const titreModal2 = document.getElementById("title")
const categorieModal2 = document.getElementById("category")

const fileUploadInput = document.querySelector(".file-upload")
const fileUploadLabel = document.querySelector(".file-upload-label")

setModalsListeners(categoriesData, modalContent, modalContent2, categorieModal2, titreModal2)

setListenerSendWork(btnSendWork, formUpload, fileUploadLabel, titreModal2, categorieModal2, categoriesIds)
imgSelectandPreview(fileUploadInput, fileUploadLabel)


titreModal2.addEventListener("input", function(){
  const modalTitleEmptyWarning = document.querySelector(".modal-title-empty-warning ")

  if (titreModal2.value === "") {
    // const btnEmptyTitle = document.createElement("p")
    // btnEmptyTitle.classList.add("modal-title-empty-warning")
    // btnEmptyTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Le titre ne peut pas être vide`
    // titreModal2.insertAdjacentElement('afterend', btnEmptyTitle)
    console.log("titre vide");
    // modalTitleEmptyWarning.classList.remove("hidden")
    modalTitleEmptyWarning.style.color = "red"


  } else {
    // if (titreModal2.nextElementSibling.tagName === 'P') {
      //   titreModal2.nextElementSibling.remove()
      // }
      // modalTitleEmptyWarning.classList.add("hidden")
      modalTitleEmptyWarning.style.color = "white"
    }
})

function listenEmptyTtitle() {

}

// function setListenerDivForSendWork(titreModal2, categoriesIds, categorieModal2, fileUploadLabel) {

  const divForListenerSendWork = document.querySelector(".div-for-listener-send-work")
  console.log(divForListenerSendWork);
  console.log("Je rentre dedans!");

  divForListenerSendWork.addEventListener("click", function() {
    if (titreModal2.value === "") {
      console.log("titre vide");
    }

    if (!categoriesIds.includes(parseInt(categorieModal2.value))) {
      console.log("catgeorie vide");
    }

    if (fileUploadLabel.firstElementChild.tagName !== "IMG") {
      console.log("image vide");
    }

  })
// }

// setListenerDivForSendWork(titreModal2, categoriesIds, categorieModal2, fileUploadLabel)
