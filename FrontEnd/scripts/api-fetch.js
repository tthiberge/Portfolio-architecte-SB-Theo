console.log("Tu es dans api-fetch.js");


export async function getWorksData() {

  let worksData = window.localStorage.getItem("works")

  if (worksData === null) {
    // Dans ce cas, appel à l'API
    console.log("Le localStorage des travaux était vide, il a fallu fetcher l'API");

    const responseWorks = await fetch("http://localhost:5678/api/works")
    worksData = await responseWorks.json()
    console.log(worksData);

    // Une fois mis à jour, j'enregistre quand même dans le localStorage
    // Transformation des travaux en JSON
    const works = JSON.stringify(worksData)
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("works", works)

    return worksData

  } else {
    // S'il y a quelque chose dans le localStorage, je le rends lisible
    console.log("J'ai trouvé qqch dans le localStorage pour les Travaux, je n'ai pas appelé l'API");

    worksData = JSON.parse(worksData)
    return worksData
  }
}
// => ça a l'air de fonctionner car dans la console, je n'ai plus le console.log du if


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
  return window.localStorage.getItem("token")
}

export async function deleteWork(id) {
  const token = getToken()
  // console.log(id);
  // console.log(token);
  // console.log(`http://localhost:5678/api/works/${id}`);


  const responseDelete = await fetch(`http://localhost:5678/api/works/${id}`, {
    headers: {Authentication: `Bearer ${token}`}
  })
  console.log(responseDelete);



}
