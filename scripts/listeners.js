console.log("Je suis dans listeners.js");

export async function setFilterListener(displayFunction, arrayOfWorks) {

  const filterItems = document.querySelectorAll(".filters button")

  for (let i = 0; i < filterItems.length; i++) {
    const filterItem = filterItems[i];

    filterItem.addEventListener("click", function (event) {
      // Boucle pour réinitialiser les couleurs de tous les filtres à vert sur blanc
      for (let i = 0; i < filterItems.length; i++) {
        filterItems[i].classList.remove("filters-clicked");
        filterItems[i].classList.add("filters-unclicked");
      }

      // Pour le filtre sur lequel je viens de cliquer, je mets blanc sur vert
      filterItem.classList.remove("filters-unclicked")
      filterItem.classList.add("filters-clicked")

      if (event.target.innerText === "Tous") {
        displayFunction(arrayOfWorks)

      } else {
        const worksFiltered = arrayOfWorks.filter(function (work) {
          return work.category.name === event.target.innerText
        })
        displayFunction(worksFiltered)
      }
    })
  }
}
