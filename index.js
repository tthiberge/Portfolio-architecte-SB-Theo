console.log("hello");


// Importer les fonctions dont j'ai besoin



// Appel à l'API
const response = await fetch("http://localhost:5678/api/works")
const worksData = await response.json()

console.log(worksData);

// Selecting my gallery of works

const galleryWorks = document.querySelector(".gallery")
console.log(galleryWorks);
galleryWorks.innerHTML = ""

// Checking my code for 1 work

const firstWork = worksData[0]
console.log(firstWork);
console.log(firstWork.title);
console.log(firstWork.imageUrl);
console.log(firstWork.categoryId); // Pour plus tard, faire appel aussi aux catégories pour matcher le categoryId

// Creating the elements of my card
const figureWork = document.createElement("figure")
const imgWork = document.createElement("img")
imgWork.src = firstWork.imageUrl
imgWork.alt = firstWork.title
console.log(imgWork);
const figCaptionWork = document.createElement("figcaption")
figCaptionWork.innerText = firstWork.title

// Appending the elemnts of my card

galleryWorks.appendChild(figureWork)
figureWork.appendChild(imgWork)
figureWork.appendChild(figCaptionWork)


// Améliorer en faisant l'appel au local storage et voir si c'est vide
