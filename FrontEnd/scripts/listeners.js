import { displayGridWorks } from "./displayElement.js";

export async function setFilterListener(arrayOfWorks) {
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
        displayGridWorks(arrayOfWorks)

      } else {
        const worksFiltered = arrayOfWorks.filter(function (work) {
          return work.category.name === event.target.innerText
        })
        displayGridWorks(worksFiltered)
      }
    })
  }
}

export async function setLogoutListnenerfromHomepage(removeModify, removeLogout) {
  const btnLogout = document.querySelector(".logout")

  btnLogout.addEventListener("click", function() {
    if (isConnected()) {
      clearLocalStorage()
    }

    removeModify()
    removeLogout()
    location.reload()
  })
}

export async function setLogoutListnenerfromLogin(removeLogout) {
  const btnLogout = document.querySelector(".logout")

  btnLogout.addEventListener("click", function() {
    if (isConnected()) {
      clearLocalStorage()
    }

    removeLogout()
    location.reload()
  })
}

export async function handleFormSubmit(event) {
  event.preventDefault()

  try {
    // Récupérer les champs du formulaire
    const loginDetails = getLoginDetailsFromForm(event.target)

    // Envoyer la requête et récupérer la réponse
    const loginResponse = await loginUser(loginDetails)

    // Enregistrer le token dans le localStorage
    processLoginResponse(loginResponse)

    // Renvoyer vers la page projet
    window.location.href = './index.html'


  } catch (error) {
    console.error(error.message);
    displayErrorMessageLogin(error)
  }
}

// Fonction réutilisable de vérification de mes deux inputs de connexion
function checkInput(input) {
  // Si le champ est vide, on lance une exception
  if (input.value === "") {
      throw new Error(`Le champ ${input.name} est vide`)
  }
}

function getLoginDetailsFromForm(formElement){
  const email = formElement.querySelector("[name=email]")
  const password = formElement.querySelector("[name=password]")
  checkInput(email)
  checkInput(password)

  return {
    email: email.value,
    password: password.value
  }
}

async function loginUser(loginDetails) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginDetails)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`La requête n'a pu aboutir. \nLe serveur indique '${errorData.message}'. \nErreur dans l’identifiant ou le mot de passe. \nMerci de vérifier vos identifiants et de cliquer sur 'Mot de passe oublié' au besoin`)
  }

  return response.json()
}

function processLoginResponse(loginResponse) {
   // Stocker ID et token dans localstorage
   const tokenStringified = JSON.stringify(loginResponse.token)
   window.localStorage.setItem("token", tokenStringified)
   const userIdStringified = JSON.stringify(loginResponse.userId)
   window.localStorage.setItem("userId", userIdStringified)

   // Pour vérifier que je l'ai bien (même si je peux le voir dans l'inspecteur -> Appli)
   const tokenSaved = window.localStorage.getItem("token")
   console.log(`There is a saved token whose value is ${tokenSaved}`);
}

function displayErrorMessageLogin(error) {
  const warningMessage = document.querySelector(".warning")
  warningMessage.innerText = error.message
}

function isConnected() {
  return (window.localStorage.getItem("userId") && window.localStorage.getItem("token"))
}

function clearLocalStorage() {
  window.localStorage.removeItem("userId")
  window.localStorage.removeItem("token")
}
