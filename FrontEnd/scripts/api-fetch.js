import { displayGridWorks} from "./displayElement.js";
import { displayGridWorksInModal, existAndIsImage, respectsSizeLimit } from "./modal.js";

let worksData

export async function getWorksData() {
    const responseWorks = await fetch("http://localhost:5678/api/works")
    worksData = await responseWorks.json()

    // Une fois mis à jour, j'enregistre quand même dans le localStorage
    // Transformation des travaux en JSON
    const works = JSON.stringify(worksData)
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("works", works)

    return worksData
}

export async function getCategoriesData() {
  let categoriesData = window.localStorage.getItem("categories")

  if (categoriesData === null) {
    // Dans ce cas, appel à l'API
    // console.log("Le localStorage des catégories était vide, il a fallu fetcher l'API");

    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categoriesData = await responseCategories.json()

    // Une fois mis à jour, j'enregistre quand même dans le localStorage
    // Transformation des catégories en JSON
    const categories = JSON.stringify(categoriesData)
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("categories", categories)

    return categoriesData

  } else {
    // S'il y a quelque chose dans le localStorage, je le rends lisible
    // console.log("J'ai trouvé qqch dans le localStorage pour les Catégories, je n'ai pas appelé l'API");

    categoriesData = JSON.parse(categoriesData)
    return categoriesData
  }
}

export function getToken() {
  // Peut-être gérer à terme au cas où le token ait expiré ou soit null
  return JSON.parse(window.localStorage.getItem("token"))
}

export async function deleteWork(id) {
  const token = getToken()

  try {
    const responseDelete = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (responseDelete.ok) {
      if (responseDelete.status === 204){
        console.log('Resource deleted successfully, no content returned.');
      }
    } else {
      const errorData = await responseDelete.json()
      throw new Error(`La requête n'a pu aboutir. \nLe serveur indique '${errorData.message}'.`)
    }

    await getWorksData()
    displayGridWorks(worksData)
    displayGridWorksInModal(worksData)

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

export async function sendWork(formUpload) {
  // Je crée le FormData
  let formSendWorkData = new FormData(formUpload)

  const token = getToken()
  const file = formSendWorkData.get("image")

  try {
    if (existAndIsImage(file)) {
      if (respectsSizeLimit(file)) {
      const responseSendWork = await fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formSendWorkData
      })

      if (!responseSendWork.ok) {
        const errorData = await responseSendWork.json()
        throw new Error(`La requête n'a pu aboutir. \nLe serveur indique '${errorData.message}'`)
      }

      // const responseSendWorkData = await responseSendWork.json();

      await getWorksData()
      displayGridWorks(worksData)
      displayGridWorksInModal(worksData)

      // Donne un effet visuel de désactivation si l'envoi est réussi + vraiment le désactiver
      const btnSendWork = document.querySelector(".modal-send-work")
      btnSendWork.classList.add("disabled")
      btnSendWork.disabled = true

      // Crée un message de succès puis supprime cet élément au bout de 3 secondes au cas où la personne décide de rajouter un nouvel élement depuis cette page, sans passer par la modale 1
      createAndRemoveMessage()

      } else {
        // Throw une erreur au cas où la personne a quand même réussi à lancer l'envoi malgré les critères à valider dans la fonction setListenerSendWork
        throw new Error ("L'image est trop volumineuse")
      }
    } else {
      // Throw une erreur >au cas où la personne a quand même réussi à lancer l'envoi malgré les critères à valider dans la fonction setListenerSendWork
      throw new Error ("Le document chargé n'est pas une image. Réessayez avec le bon format de fichier")
    }

  } catch (error) {
    console.error('Erreur détectée:', error.message);
  }
}

function createAndRemoveMessage() {
  // Création de l'élément p, ajout au DOM et suppression au bout de 3 secondes
  const btnSuccessfulWorkSent = document.createElement("p");
  btnSuccessfulWorkSent.classList.add("modal-successful-sent-work");
  btnSuccessfulWorkSent.innerText = "Projet ajouté avec succès !";

  const modalContent2 = document.querySelector(".modal-content-2");
  modalContent2.appendChild(btnSuccessfulWorkSent);

  setTimeout(() => {
      btnSuccessfulWorkSent.remove();
  }, 3000);
}
