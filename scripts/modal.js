import { deleteWork, setSendWorkListenerAndSend } from "./api-fetch.js";

// Bien définir une variable à un higher scope pour qu'elle soit accessible à toutes les fonctions de la page
let modalFromIndex

export function setModal(modal) {
  // Assigner à notre variable anonyme la valeur issue réelle issue de index.js
  modalFromIndex = modal

  // Get open modal button
  const openModalBtn = document.querySelector('.openModal');

  // Get close button
  const closeModalBtns = document.querySelectorAll('.closeBtn');

  // Listen for open click
  openModalBtn.addEventListener('click', openModal);

  // Listen for close click
  closeModalBtns.forEach((closeModalBtn) => {
    closeModalBtn.addEventListener('click', closeModal);
  })

  // Listen for outside click
  window.addEventListener('click', outsideClick);
}


// Function to open/reveal modal
function openModal() {
  modalFromIndex.style.display = 'block';
}

// Function to close/hide modal
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
  // Sélectionner et ré-initialiser ma gallery de travaux
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
    imgWork.src = work.imageUrl
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

    // Appending the elements of my card
    modalGrid.appendChild(figureWork)
    figureWork.appendChild(imgWork)
    figureWork.appendChild(figCaptionWork)
    figureWork.appendChild(trashIcon)
    figureWork.appendChild(zoomIcon)
  }
}

export function setListenerZoomIcon(modalFigures) {
  modalFigures.forEach((modalFigure) => {
    const zoomIcon = modalFigure.querySelector(".zoom-icon")

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
      deleteWork(id)
    }
  })
}

export function setModalsListeners(arrayOfCategories, modalContent, modalContent2, formUpload, categorieModal2) {
  // Ciblage des boutons significatifs sur les modales
  const btnAddPicture = modalContent.querySelector(".modal-add-picture")
  const btnArrowBack = document.querySelector(".arrowBackBtn")

  //Réinitialisation du menu déroulant de la modale 2
  categorieModal2.innerHTML = ""

  // Création du menu déroulant de la modale 2
  const pleaseSelect = document.createElement("option")
  pleaseSelect.innerText = "Please select a category"
  pleaseSelect.disabled = true
  pleaseSelect.selected = true
  categorieModal2.appendChild(pleaseSelect)

  arrayOfCategories.forEach(cat => {
    const category = document.createElement("option")
    category.innerText = cat.name
    category.value = cat.id // Ce qui sera envoyé dans le FormData
    categorieModal2.appendChild(category)
  })

  // Passage de la modale 1 à la modale 2
  btnAddPicture.addEventListener("click", function() {
    modalContent2.classList.remove("hidden")
    modalContent.classList.add("hidden")
  })

  // Passage de la modale 2 à la modale 1
  btnArrowBack.addEventListener("click", function() {
    modalContent.classList.remove("hidden")
    modalContent2.classList.add("hidden")

    // Le retour à la modale 1 désactive le bouton permettant de poster un nouveau projet
    // et réinitialise les inputs du formulaire
    const btnSendWork = document.querySelector(".modal-send-work")
    console.log(btnSendWork);
    btnSendWork.classList.add("disabled")

    const fileUploadInputs = document.querySelectorAll(".file-upload")
    console.log(fileUploadInputs);
    const fileUploadLabel = document.querySelector(".file-upload-label")
    console.log(fileUploadLabel);
    fileUploadLabel.innerHTML = `
    <i class="fa-regular fa-image file-upload-img"></i>
    <p class="file-upload-add">+ Ajouter photo</p>
    <p class="file-upload-authorized">jpg, png : 4mo max</p>
    `
    console.log(fileUploadLabel);
    // Je remets le listener pour la preview sur ce nouveau HTML
    // Autrement, la preview ne fonctionnait pas sur un 2ème upload
    // imgSelectandPreview(fileUploadInput, fileUploadLabel)

    formUpload.children[3].value = ""
    formUpload.children[5].value = ""

    // Réinitialisation du message "Projet ajouté avec succès" pour que les messages
    // ne s'accumulent pas - Prise en compte du cas où aucun projet n'a été chargé
    const btnsSuccessfulWorkSent =  document.querySelectorAll(".modal-successful-sent-work")
    console.log(btnsSuccessfulWorkSent);
    if (btnsSuccessfulWorkSent) {
      btnsSuccessfulWorkSent.forEach((btn) => {
        btn.remove()
        console.log("removed")
      })
    }
  })
}


export function displayBottomOfModal2(modalContent2) {
  const line = document.createElement("div")
  line.classList.add("modal-line-upload")

  const btnSendWork = document.createElement("input")
  btnSendWork.setAttribute("type", "button")
  btnSendWork.classList.add("modal-send-work")
  btnSendWork.classList.add("disabled")
  btnSendWork.value = "Valider"

  modalContent2.appendChild(line)
  modalContent2.appendChild(btnSendWork)
}

export function setListenerSendWork(btnSendWork, formUpload, fileUploadLabel, titreModal2, categorieModal2, categoriesIds) {
  formUpload.addEventListener("change", function(){
  if (titreModal2.value !== ""
    && categoriesIds.includes(parseInt(categorieModal2.value))
    && fileUploadLabel.firstElementChild.tagName === "IMG") {
      btnSendWork.classList.remove("disabled")
      console.log("yo");
      // setSendWorkListenerAndSend(btnSendWork, formUpload)
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
    fileUploadLabel.appendChild(uploadImgPreview)
    // Ne pas oublier, sinon on ne le voit pas!

    // Lecture côté client de l'image
    const file = event.target.files[0]
    // console.log(file);

    if (file && file.type.startsWith('image/')) {
      if (file.size <= 4 * 1024 * 1024) {
        const reader = new FileReader()

        reader.onload = function(e) {
          uploadImgPreview.src = e.target.result
        }

        reader.readAsDataURL(file)
        console.log(fileUploadLabel.firstElementChild.tagName);

      } else {
        fileUploadLabel.innerHTML = `<p> Image trop volumineuse: ${Math.round(file.size / (1024 * 1024))} Mo</p>
        <p> Taille maximale de 4 Mo </p>
        <p> Compressez la photo et réessayez </p>`
        fileUploadLabel.style.color = "red"
        console.log("L'image est trop volumineuse !");
        // alert("L'image est trop volumineuse !");
      }
    } else {
      fileUploadLabel.innerHTML = `<p> Mauvais type de fichier</p>
      <p>Merci de choisir une image </p>`
      fileUploadLabel.style.color = "red"
      console.log("Je n'ai pas pu affichier le preview");
    }
  })
}
