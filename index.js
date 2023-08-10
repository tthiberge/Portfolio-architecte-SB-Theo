console.log("Tu es dans index.js");

// Importer les fonctions dont j'ai besoin


// localStorage first
let worksData = window.localStorage.getItem("works")

if (worksData === null) {
  // Dans ce cas, appel à l'API
  const response = await fetch("http://localhost:5678/api/works")
  worksData = await response.json()
  console.log(worksData);

  // Une fois mis à jour, j'enregistre quand même dans le localStorage
  // Transformation des travaux en JSON
  const works = JSON.stringify(worksData)
  // Stockage des informations dans le localStorage
  window.localStorage.setItem("works", works)

} else {
  // S'il y a quelque chose dans le localStorage, je le rends lisible
  worksData = JSON.parse(worksData)

}
// => ça a l'air de fonctionner car dans la console, je n'ai plus le console.log du if


// Selecting my gallery of works
const galleryWorks = document.querySelector(".gallery")
galleryWorks.innerHTML = ""

// Pour plus tard, faire appel aussi aux catégories pour matcher le categoryId

// Balayer tous les éléments récupérés sur l'API
for (let i = 0; i < worksData.length; i++) {
  const work = worksData[i];

  // Creating the elements of my card
  const figureWork = document.createElement("figure")
  const imgWork = document.createElement("img")
  imgWork.src = work.imageUrl
  imgWork.alt = work.title
  const figCaptionWork = document.createElement("figcaption")
  figCaptionWork.innerText = work.title

  // Appending the elemnts of my card

  galleryWorks.appendChild(figureWork)
  figureWork.appendChild(imgWork)
  figureWork.appendChild(figCaptionWork)
}



// Améliorer en faisant l'appel au local storage et voir si c'est vide
