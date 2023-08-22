import { displayGridWorks} from "./displayElement.js";
import { displayGridWorksInModal } from "./modal.js";

let worksData


export async function getWorksData() {
    const responseWorks = await fetch("http://localhost:5678/api/works")
    worksData = await responseWorks.json()
    // console.log(worksData);

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
    console.log("Le localStorage des catégories était vide, il a fallu fetcher l'API");

    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const categoriesData = await responseCategories.json()
    console.log(categoriesData);

    // Une fois mis à jour, j'enregistre quand même dans le localStorage
    // Transformation des catégories en JSON
    const categories = JSON.stringify(categoriesData)
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("categories", categories)

    return categoriesData

  } else {
    // S'il y a quelque chose dans le localStorage, je le rends lisible
    console.log("J'ai trouvé qqch dans le localStorage pour les Catégories, je n'ai pas appelé l'API");

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
    // console.log(responseDelete.ok);
    // console.log(responseDelete);

    if (responseDelete.ok) {
      if (responseDelete.status === 204){
        console.log('Resource deleted successfully, no content returned.');
      }
    }

    await getWorksData()
    console.log(worksData);
    displayGridWorks(worksData)
    displayGridWorksInModal(worksData)

  } catch (error) {
    console.error('Error occurred:', error);
  }
}

export function setSendWorkListenerAndSend(btnSendWork, formUpload) {
  btnSendWork.addEventListener("click", function() {
    let formSendWorkData = new FormData(formUpload)
    sendWork(formSendWorkData)
  })
}

async function sendWork(formSendWorkData,) {
  const token = getToken()
  console.log(token);

  console.log(formSendWorkData.get("image"));
  const file = formSendWorkData.get("image")

  try {
   if (file && file.type.startsWith('image/')) {
    console.log("C'est une image!");
      if (file.size <= 4 * 1024 * 1024) {
        console.log("Mon fichier fait moins de 4Mo nananère");

      const responseSendWork = await fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formSendWorkData
      })

      console.log(responseSendWork.ok);

      const responseSendWorkData = await responseSendWork.json();
      console.log(responseSendWorkData);

      await getWorksData()
      console.log(worksData);

      displayGridWorks(worksData)
      displayGridWorksInModal(worksData)

      const btnSuccessfulWorkSent = document.createElement("p")
      btnSuccessfulWorkSent.classList.add("modal-successful-sent-work")
      btnSuccessfulWorkSent.innerText = "Projet ajouté avec succès !"

      const modalContent2 = document.querySelector(".modal-content-2")
      modalContent2.appendChild(btnSuccessfulWorkSent)

      const btnSendWork = document.querySelector(".modal-send-work")
      btnSendWork.classList.add("disabled")

      } else {
        throw new Error ("L'image est trop volumineuse")
      }
    } else {
      throw new Error ("Le document chargé n'est pas une image. Réessayez avec le bon format de fichier")
    }

  } catch (error) {
    console.error('Erreur détectée:', error);
  }
}
