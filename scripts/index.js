console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin
import { getWorksData, getCategoriesData } from "./api-fetch.js";
import { displayGridWorks, displayFilters } from "./displayElement.js";
import { setFilterListener } from "./listeners.js";

// Recuperer le formulaire de connexion
const formLogin = document.querySelector(".form-login")
const email = document.querySelector(".form input[type='email']")
const password = document.querySelector(".form input[type='password']")
console.log(formLogin);

formLogin.addEventListener("submit", function(event) {
  event.preventDefault()
  console.log(event.target);
  // console.log(formLogin);
  // console.log(email.value);
  // console.log(password.value);

  const loginId = {
    "email": `${email.value}`,
    "password": `${password.value}`,
  }

  const loginLoad = JSON.stringify(loginId)

  console.log(typeof loginId);
  console.log(typeof loginLoad);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: loginLoad
  }

  )


})





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


// Déployer les eventlisteners sur tous ces boutons

setFilterListener(displayGridWorks, worksData);
