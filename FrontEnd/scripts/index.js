console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin
import { getWorksData, getCategoriesData } from "./api-fetch.js";
import { displayGridWorks, displayFilters, displayModifyIfConnected, displayLogoutIfConnected, removeFiltersIfConnected, removeModify, removeLogout } from "./displayElement.js";
import { setFilterListener, setLogoutListnenerfromHomepage,  } from "./listeners.js";
import { setModal, displayGridWorksInModal, setListenerZoomIcon, displayBottomOfModal, setListenerTrashIcon, setModalsListeners, displayBottomOfModal2, setListenerSendWork } from "./modal.js";


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
setModalsListeners(categoriesData, modalContent, modalContent2)
displayBottomOfModal2(modalContent2)

const btnSendWork = document.querySelector(".modal-send-work")
const formUpload = document.querySelector(".form-upload").firstElementChild
const titreModal2 = document.querySelector("#titre")
const categorieModal2 = document.querySelector("#categorie")

const fileUploadInput = document.querySelector(".file-upload")
const fileUploadLabel = document.querySelector(".file-upload-label")

fileUploadInput.addEventListener("change", function(event) {
  console.log(event.target.files)

  fileUploadLabel.innerHTML = ""

  const uploadImgPreview = document.createElement("img")
  uploadImgPreview.alt = "Photo du projet nouvellement ajouté"
  uploadImgPreview.classList.add("img-upload-preview")
  fileUploadLabel.appendChild(uploadImgPreview) // Ne pas oublier, sinon on ne le voit pas!

  // Lecture côté client de l'image
  const file = event.target.files[0]
  console.log(file);

  if (file && file.type.startsWith('image/')) {
    if (file.size <= 4 * 1024 * 1024) {
      const reader = new FileReader()

      reader.onload = function(e) {
        uploadImgPreview.src = e.target.result
      }

      reader.readAsDataURL(file)

      console.log(fileUploadLabel.firstElementChild.tagName);

    } else {
      fileUploadLabel.innerHTML = `<p> Image trop volumineuse</p>
      <p> La taille doit être inférieure à 4 Mo </p>
      <p> Compressez la photo et réessayez </p>`
      fileUploadLabel.style.color = "red"
      console.log("L'image est trop volumineuse !");
      // alert("L'image est trop volumineuse !");
      console.log(fileUploadLabel.firstElementChild.tagName);

    }

  } else {
    fileUploadLabel.innerHTML = `<p> Mauvais type de fichier</p>
    <p>Merci de choisir une image </p>`
    fileUploadLabel.style.color = "red"
    // uploadImgPreview.alt = 'Mauvais type de fichier \nMerci de choisir une image'; // clear the preview if it's not an image
    console.log("Je n'ai pas pu affichier le preview");
    console.log(fileUploadLabel.firstElementChild.tagName);

  }
})

setListenerSendWork(btnSendWork, formUpload, fileUploadLabel, titreModal2, categorieModal2, categoriesNames)