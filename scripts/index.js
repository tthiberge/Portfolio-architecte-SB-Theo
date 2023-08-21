console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin
import { getWorksData, getCategoriesData, getToken, setSendWorkListenerAndSend } from "./api-fetch.js";
import { displayGridWorks, displayFilters, displayModifyIfConnected, displayLogoutIfConnected, removeFiltersIfConnected, removeModify, removeLogout } from "./displayElement.js";
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


// Récupérer les catégories
let categoriesData = await getCategoriesData()
console.log(categoriesData);

// Afficher les filtres
displayFilters(categoriesData)
const categoriesNames = categoriesData.map(category => category.name)
const categoriesIds = categoriesData.map(category => category.id)
console.log(categoriesIds);


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

// Créer la deuxième modal et gérer l'interaction entre les deux
const modalContent2 = document.querySelector(".modal-content-2")
displayBottomOfModal2(modalContent2)

const btnSendWork = document.querySelector(".modal-send-work")
const formUpload = document.querySelector(".form-upload").firstElementChild
const titreModal2 = document.querySelector("#title")
const categorieModal2 = document.querySelector("#category")

const fileUploadInput = document.querySelector(".file-upload")
const fileUploadLabel = document.querySelector(".file-upload-label")

setModalsListeners(categoriesData, modalContent, modalContent2, formUpload)

imgSelectandPreview(fileUploadInput, fileUploadLabel)
setListenerSendWork(btnSendWork, formUpload, fileUploadLabel, titreModal2, categorieModal2, categoriesIds)

// FormData sur le bouton Valider
// Penser à remettre les deux class .disabled quand ça fonctionne

const formSendWork = document.getElementById("form-send-work")
setSendWorkListenerAndSend(btnSendWork, formSendWork)
