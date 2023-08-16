console.log("Je suis dans modal.js");

// Bien définir une variable à un higher scope pour qu'elle soit accessible à toutes les fonctions de la page
// Get modal element
let modalFromIndex

export function setModal(modal) {
  // Assigner à notre variable anonyme la valeur issue réelle issue de index.js
  modalFromIndex = modal

  // Get open modal button
  const openModalBtn = document.querySelector('.openModal');
  console.log(openModalBtn);

  // Get close button
  const closeModalBtn = document.getElementById('closeModalBtn');
  console.log(closeModalBtn);

  // Listen for open click
  openModalBtn.addEventListener('click', openModal);

  // Listen for close click
  closeModalBtn.addEventListener('click', closeModal);

  // Listen for outside click
  window.addEventListener('click', outsideClick);
}


// Function to open modal
function openModal() {
  modalFromIndex.style.display = 'block';
}

// Function to close modal
function closeModal() {
  modalFromIndex.style.display = 'none';
}

// Function to close modal if outside click
function outsideClick(event) {
  if (event.target == modalFromIndex) {
    modalFromIndex.style.display = 'none';
  }
}


