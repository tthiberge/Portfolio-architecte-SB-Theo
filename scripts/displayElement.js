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
