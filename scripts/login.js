import  { displayLogoutIfConnected, removeLogout } from "./displayElement.js";
import { setLogoutListnenerfromLogin, handleFormSubmit } from "./listeners.js";


setLogoutListnenerfromLogin(removeLogout)
displayLogoutIfConnected()


// Ecouter le submit du formulaire de connexion
const formLogin = document.querySelector(".form-login")
formLogin.addEventListener("submit", handleFormSubmit)
