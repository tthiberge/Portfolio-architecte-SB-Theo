console.log("Je suis dans login.js")

import  { displayLogoutIfConnected, removeLogout, displayErrorMessageLogin } from "./displayElement.js";
import { setLogoutListnenerfromLogin } from "./listeners.js";

displayLogoutIfConnected()
setLogoutListnenerfromLogin(removeLogout)


// Fonction réutilisable de vérification de mes deux inputs de connexion
function checkInput(input) {
  // Si le champ est vide, on lance une exception
  if (input.value === "") {
      throw new Error(`Le champ ${input.name} est vide`)
  }
}

// Ecouter le submit du formulaire
const formLogin = document.querySelector(".form-login")

formLogin.addEventListener("submit", async function(event) {
  event.preventDefault()

  try {
    const email = event.target.querySelector("[name=email]")
    checkInput(email)
    const password = event.target.querySelector("[name=password]")
    checkInput(password)
    // console.log(email.value);
    // console.log(password.value);

    const loginId = {
      "email": `${email.value}`,
      "password": `${password.value}`,
    }

    const loginLoad = JSON.stringify(loginId)

    // console.log(loginId);
    // console.log(loginLoad);
    // console.log(typeof loginId);
    // console.log(typeof loginLoad);


    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: loginLoad
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.message
      throw new Error(`La requête n'a pu aboutir. \nLe serveur indique '${errorMessage}'. \nMerci de vérifier vos identifiants et de cliquer sur 'Mot de passe oublié' au besoin`)
    }

    const dataLogin = await response.json()

    console.log(dataLogin);
    console.log(dataLogin.userId);
    console.log(dataLogin.token);

    // Stocker ID et token dans localstorage
    const tokenStringified = JSON.stringify(dataLogin.token)
    // console.log(tokenStringified);

    window.localStorage.setItem("token", tokenStringified)
    console.log("yeah");
    const tokenSaved = window.localStorage.getItem("token")
    console.log(`There is a saved token whose value is ${tokenSaved}`);


    // Renvoyer vers la page projet
    window.location.href = 'http://localhost:5501/index.html'


  } catch (error) {
    console.log(error.message);
    displayErrorMessageLogin(error)

  }
})
