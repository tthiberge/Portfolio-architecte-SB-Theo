console.log("Tu es dans displayElement.js");

export function displayGridWorks(arrayOfWorks) {
  // Selecting my gallery of works
  const galleryWorks = document.querySelector(".gallery")
  galleryWorks.innerHTML = ""

  // Balayer tous les éléments récupérés sur l'API
  for (let i = 0; i < arrayOfWorks.length; i++) {
    const work = arrayOfWorks[i];

    // Creating the elements of my card
    const figureWork = document.createElement("figure")
    const imgWork = document.createElement("img")
    imgWork.src = work.imageUrl
    imgWork.alt = work.title
    const figCaptionWork = document.createElement("figcaption")
    figCaptionWork.innerText = work.title

    // Appending the elemnts of my card

    galleryWorks.appendChild(figureWork)
    figureWork.appendChild(imgWork)
    figureWork.appendChild(figCaptionWork)
  }
}

// export function displayGridWorksInModal(arrayOfWorks) {
//   // Selecting my gallery of works
//   const modalGrid = document.querySelector(".modal-grid")
//   modalGrid.innerHTML = ""

//   // Balayer tous les éléments récupérés sur l'API
//   for (const work in arrayOfWorks) {

//     // Creating the elements of my card
//     const figureWork = document.createElement("figure")
//     figureWork.classList.add("figure-work")
//     const imgWork = document.createElement("img")
//     imgWork.src = "assets/images/abajour-tahina.png"
//     imgWork.alt = work.title
//     imgWork.classList.add("img-work")
//     const figCaptionWork = document.createElement("figcaption")
//     figCaptionWork.innerText = "éditer"

//     // const workIcons = document.createElement("div")
//     // workIcons.classList.add("work-icons")

//     const trashIcon = document.createElement("p")
//     trashIcon.classList.add("trash-icon")

//     const zoomIcon = document.createElement("p")
//     zoomIcon.classList.add("zoom-icon")


//     // Appending the elemnts of my card

//     modalGrid.appendChild(figureWork)
//     figureWork.appendChild(imgWork)
//     figureWork.appendChild(figCaptionWork)
//     figureWork.appendChild(trashIcon)
//     figureWork.appendChild(zoomIcon)


//   }


// }


export async function displayFilters(arrayOfCategories) {
  const filters = document.querySelector(".filters")

  const categoriesNames = arrayOfCategories.map(category => category.name)

  for (let i = 0; i < categoriesNames.length; i++) {
    const category = categoriesNames[i];

    const filterItem = document.createElement("button")
    filterItem.innerText = category
    filterItem.classList.add("filters-unclicked")
    filters.appendChild(filterItem)
  }

  const tousButton = document.querySelectorAll(".filters-unclicked")[0]

  tousButton.classList.remove("filters-unclicked")
  tousButton.classList.add("filters-clicked")
}

export function displayModifyIfConnected () {
  if (window.localStorage.getItem("token")) {
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    if (token  !== null) {
      const btnLogout = document.querySelector(".logout")
      btnLogout.classList.remove("invisible")

      const btnModify = document.querySelectorAll(".invisible")

      for (const btn of btnModify) {
        btn.classList.remove("invisible")
      }
    } else {
      console.log("Je ne display pas les boutons modifier car erreur de comparaison de token");
    }
  }
}

export function displayLogoutIfConnected () {
  if (window.localStorage.getItem("token")) {
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (token  !== null || token !== undefined) {
      const btnLogout = document.querySelector(".logout")
      btnLogout.classList.remove("invisible")
    } else {
      console.log("Je ne display pas le bouton logout car erreur de comparaison de token");
    }
  }
}

export function removeFiltersIfConnected () {
  if (window.localStorage.getItem("token")) {
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (token  !== null) {
      const filters = document.querySelector(".filters")
      filters.classList.add("invisible")
    } else {
      console.log("Je laisse les boutons de filtrage car erreur de comparaison de token");
    }
  }
}


export async function removeModify() {
  const btnModify = document.querySelectorAll(".modify-invisible")

  for (const btn of btnModify) {
    btn.classList.add("modify-invisible")
  }
}

export async function removeLogout() {
  const btnLogout = document.querySelector(".logout")
  btnLogout.classList.add("invisible")
}
