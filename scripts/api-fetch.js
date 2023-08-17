console.log("Tu es dans api-fetch.js");

import { displayGridWorks} from "./displayElement.js";
import { displayGridWorksInModal } from "./modal.js";

let worksData


export async function getWorksData() {
    const responseWorks = await fetch("http://localhost:5678/api/works")
    worksData = await responseWorks.json()
    console.log(worksData);

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

function getToken() {
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
