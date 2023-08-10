console.log("Tu es dans createHTMLElement.js");

export function displayGridWorks(arrayOfWorks) {
  // Selecting my gallery of works
  const galleryWorks = document.querySelector(".gallery")
  galleryWorks.innerHTML = ""

  // Balayer tous les éléments récupérés sur l'API
  for (let i = 0; i < arrayOfWorks.length; i++) {
    const work = arrayOfWorks[i];

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

}
