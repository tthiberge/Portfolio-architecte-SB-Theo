console.log("Tu es dans api-fetch.js");


export async function getWorksData() {

  let worksData = window.localStorage.getItem("works")

  if (worksData === null) {
    // Dans ce cas, appel à l'API
    console.log("Le localStorage était vide, il a fallu fetcher l'API");
    
    const response = await fetch("http://localhost:5678/api/works")
    worksData = await response.json()
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
