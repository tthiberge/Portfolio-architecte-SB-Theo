export function displayGridWorks(arrayOfWorks) {
  // Selecting my gallery of works
  const galleryWorks = document.querySelector(".gallery")
  galleryWorks.innerHTML = ""

  // Balayer tous les éléments récupérés sur l'API
  for (let i = 0; i < arrayOfWorks.length; i++) {
    const work = arrayOfWorks[i];

    createCardAndAppendToGrid(galleryWorks, work)
  }
}


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
    if (token  !== null) {
      const btnLogout = document.querySelector(".logout")
      btnLogout.classList.remove("hidden")

      const btnModify = document.querySelectorAll(".btn-modify")

      for (const btn of btnModify) {
        btn.classList.remove("hidden")
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
      const btnLogin = document.querySelector(".login")
      btnLogin.classList.add("hidden")

      const btnLogout = document.querySelector(".logout")
      btnLogout.classList.remove("hidden")

      const editBar = document.querySelector(".edit-bar")
      editBar.classList.remove(".hidden")
      editBar.classList.add(".flex")


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
      filters.classList.add("hidden")
    }
  }
}

export async function removeModify() {
  const btnModify = document.querySelectorAll(".btn-modify")

  for (const btn of btnModify) {
    btn.classList.add("hidden")
  }
}

export async function removeLogout() {
  const btnLogout = document.querySelector(".logout")
  btnLogout.classList.add("hidden")
}


function createCardAndAppendToGrid(galleryElement, work) {
  // Creating the elements of my card
  const figureWork = document.createElement("figure")
  const imgWork = document.createElement("img")
  imgWork.src = work.imageUrl
  imgWork.alt = work.title
  const figCaptionWork = document.createElement("figcaption")
  figCaptionWork.innerText = work.title

  // Appending the elemnts of my card
  galleryElement.appendChild(figureWork)
  figureWork.appendChild(imgWork)
  figureWork.appendChild(figCaptionWork)
}
