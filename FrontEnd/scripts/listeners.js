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

export async function setLogoutListnenerfromHomepage(removeModify, removeLogout) {
  const btnLogout = document.querySelector(".logout")
  console.log(btnLogout);

  btnLogout.addEventListener("click", function() {
    if (window.localStorage.getItem("token")) {
      window.localStorage.removeItem("token")
    }

    removeModify()
    removeLogout()
    location.reload()
  })
}

export async function setLogoutListnenerfromLogin(removeLogout) {
  const btnLogout = document.querySelector(".logout")
  console.log(btnLogout);

  btnLogout.addEventListener("click", function() {
    if (window.localStorage.getItem("token")) {
      window.localStorage.removeItem("token")
    }

    removeLogout()
    location.reload()
  })
}
