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
  const closeModalBtn = document.getElementById('closeModalBtn');
  // console.log(closeModalBtn);

  // Listen for open click
  openModalBtn.addEventListener('click', openModal);

  // Listen for close click
  closeModalBtn.addEventListener('click', closeModal);

  // Listen for outside click
  window.addEventListener('click', outsideClick);
}


// Function to open modal
function openModal() {
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

export function setModalsListeners(arrayOfCategories, modalContent, modalContent2) {

  const btnAddPicture = modalContent.querySelector(".modal-add-picture")
  const btnArrowBack = document.querySelector(".arrowBackBtn")

  btnAddPicture.addEventListener("click", function() {
    console.log("go");
    modalContent2.classList.remove("hidden")
    modalContent.classList.add("hidden")

    const categoriesFormSection = document.getElementById("categorie")
    const categoriesNames = arrayOfCategories.map(category => category.name)


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

}
