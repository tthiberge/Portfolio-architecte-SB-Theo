console.log("Je suis dans login.js")

import  { displayLogoutIfConnected, removeLogout } from "./displayElement.js";
import { setLogoutListnenerfromLogin, handleFormSubmit, displayErrorMessageLogin } from "./listeners.js";


displayLogoutIfConnected()
setLogoutListnenerfromLogin(removeLogout)


// Ecouter le submit du formulaire de connexion
const formLogin = document.querySelector(".form-login")
formLogin.addEventListener("submit", handleFormSubmit)
