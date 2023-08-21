console.log("Je suis dans modal.js");

import { deleteWork } from "./api-fetch.js";

// Bien définir une variable à un higher scope pour qu'elle soit accessible à toutes les fonctions de la page
// Get modal element
let modalFromIndex


export function setModal(modal) {
  // Assigner à notre variable anonyme la valeur issue réelle issue de index.js
  modalFromIndex = modal

  // Get open modal button
  const openModalBtn = document.querySelector('.openModal');
  // console.log(openModalBtn);

  // Get close button
  const closeModalBtns = document.querySelectorAll('.closeBtn');
  // console.log(closeModalBtns);

  // Listen for open click
  openModalBtn.addEventListener('click', openModal);

  // Listen for close click

  closeModalBtns.forEach((closeModalBtn) => {
    closeModalBtn.addEventListener('click', closeModal);
  })

  // Listen for outside click
  window.addEventListener('click', outsideClick);
}


// Function to open modal
function openModal() {
  console.log(modalFromIndex);
  modalFromIndex.style.display = 'block';
}

// Function to close modal
function closeModal() {
  modalFromIndex.style.display = 'none';
}

// Function to close modal if outside click
function outsideClick(event) {
  if (event.target == modalFromIndex) {
    modalFromIndex.style.display = 'none';
  }
}

export function displayGridWorksInModal(arrayOfWorks) {
  // Selecting my gallery of works
  const modalGrid = document.querySelector(".modal-grid")
  modalGrid.innerHTML = ""

  // Balayer tous les éléments récupérés sur l'API
  for (let i = 0; i < arrayOfWorks.length; i++) {
    const work = arrayOfWorks[i];

    // Creating the elements of my card
    const figureWork = document.createElement("figure")
    figureWork.classList.add("figure-work")
    figureWork.dataset.setId = work.id


    const imgWork = document.createElement("img")
    // console.log(work.imageUrl);
    imgWork.src = work.imageUrl
    // console.log(imgWork);
    imgWork.alt = work.title
    imgWork.classList.add("img-work")
    const figCaptionWork = document.createElement("figcaption")
    figCaptionWork.innerText = "éditer"
    figCaptionWork.classList.add("figcaption-work")

    const trashIcon = document.createElement("i")
    trashIcon.classList.add("fa-solid")
    trashIcon.classList.add("fa-trash-can")
    trashIcon.classList.add("trash-icon")
    trashIcon.dataset.setId = work.id

    const zoomIcon = document.createElement("i")
    zoomIcon.classList.add("fa-solid")
    zoomIcon.classList.add("fa-up-down-left-right")
    zoomIcon.classList.add("zoom-icon")
    zoomIcon.style.display = "none"

    // Appending the elemnts of my card
    modalGrid.appendChild(figureWork)
    figureWork.appendChild(imgWork)
    figureWork.appendChild(figCaptionWork)
    figureWork.appendChild(trashIcon)
    figureWork.appendChild(zoomIcon)
  }
}

export function setListenerZoomIcon(modalFigures) {
  modalFigures.forEach((modalFigure) => {
    // console.log(modalFigure);
    const zoomIcon = modalFigure.querySelector(".zoom-icon")
    // console.log(zoomIcon);

    modalFigure.addEventListener("mouseover", function() {
      zoomIcon.style.display = "block"
    })
    modalFigure.addEventListener("mouseout", function() {
      zoomIcon.style.display = "none"
    })
  })
}

export function displayBottomOfModal(modalContent) {
  const line = document.createElement("div")
  line.classList.add("modal-line")


  const btnAddPicture = document.createElement("input")
  btnAddPicture.setAttribute("type", "button")
  btnAddPicture.classList.add("modal-add-picture")
  btnAddPicture.value = "Ajouter une photo"
  // btnAddPicture.disabled = true
  // Abled sinon je peux pas faire mon listener dessus


  const btnDeleteGallery = document.createElement("p")
  btnDeleteGallery.classList.add("modal-delete-gallery")
  btnDeleteGallery.innerText = "Supprimer la galerie"

  modalContent.appendChild(line)
  modalContent.appendChild(btnAddPicture)
  modalContent.appendChild(btnDeleteGallery)
}

export function setListenerTrashIcon(elementThatIsNotRefreshed) {
  elementThatIsNotRefreshed.addEventListener("click", function(event) {
    if (event.target.matches(".trash-icon")) {
      const id = event.target.dataset.setId
      console.log(id);

      deleteWork(id)
    }
    })
}

export function setModalsListeners(arrayOfCategories, modalContent, modalContent2, formUpload) {

  const btnAddPicture = modalContent.querySelector(".modal-add-picture")
  const btnArrowBack = document.querySelector(".arrowBackBtn")

  const categoriesFormSection = document.getElementById("category")

  categoriesFormSection.innerHTML = ""

  const pleaseSelect = document.createElement("option")
  pleaseSelect.innerText = "Please select a category"
  pleaseSelect.disabled = true
  pleaseSelect.selected = true
  categoriesFormSection.appendChild(pleaseSelect)

  arrayOfCategories.forEach(cat => {
    const category = document.createElement("option")
    category.innerText = cat.name
    category.value = cat.id
    categoriesFormSection.appendChild(category)
    console.log(category);
  })

  btnAddPicture.addEventListener("click", function() {
    console.log("go");
    modalContent2.classList.remove("hidden")
    modalContent.classList.add("hidden")

    // console.log(formUpload.children[1].value)
    // console.log(formUpload.children[3].value)
    // console.log(formUpload.children[5].value)

    formUpload.children[1].value = ""
    formUpload.children[3].value = ""
    formUpload.children[5].value = ""

    // console.log(formUpload.children[1].value)
    // console.log(formUpload.children[3].value)
    // console.log(formUpload.children[5].value)

  })

  btnArrowBack.addEventListener("click", function() {
    console.log("back");
    modalContent.classList.remove("hidden")
    modalContent2.classList.add("hidden")

    const btnSendWork = document.querySelector(".modal-send-work")

    // REEEEEEEEEEEEEEEEEEEMEEEEEEEEEETTRE
    // **********************************
    // btnSendWork.classList.add("disabled")
        // **********************************
    // **********************************


  })
}

export function displayBottomOfModal2(modalContent2) {
  const line = document.createElement("div")
  line.classList.add("modal-line-upload")


  const btnSendWork = document.createElement("input")
  btnSendWork.setAttribute("type", "button")
  btnSendWork.classList.add("modal-send-work")
  // btnSendWork.classList.add("disabled")
      // **********************************
//  Remettre au dessus aussi
  btnSendWork.value = "Valider"
  // btnSendWork.disabled = true

  modalContent2.appendChild(line)
  modalContent2.appendChild(btnSendWork)
}


export function setListenerSendWork(btnSendWork, formUpload, fileUploadLabel, titreModal2, categorieModal2, categoriesIds) {
  formUpload.addEventListener("change", function(){
  if (titreModal2.value !== ""
    && categoriesIds.includes(parseInt(categorieModal2.value))
    && fileUploadLabel.firstElementChild.tagName === "IMG") {
      btnSendWork.classList.remove("disabled")
    } else {
      btnSendWork.classList.add("disabled")
    };
  })
}

export function imgSelectandPreview(fileUploadInput, fileUploadLabel) {
  fileUploadInput.addEventListener("change", function(event) {
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
        // console.log(fileUploadLabel.firstElementChild.tagName);

      }

    } else {
      fileUploadLabel.innerHTML = `<p> Mauvais type de fichier</p>
      <p>Merci de choisir une image </p>`
      fileUploadLabel.style.color = "red"
      console.log("Je n'ai pas pu affichier le preview");
      console.log(fileUploadLabel.firstElementChild.tagName);

    }
  })
}
