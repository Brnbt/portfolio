(function() {
  'use strict';
  
  const textElement = document.getElementById("nom");
  if (!textElement) return;
  
  const originalText = "iaan";
  const replacementText = "n_bt";
  let currentIndex = 0;
  let isErasing = false;
  let isReversing = false;
  let animationFrameId = null;

  function animateText() {
    if (!textElement) return;
    
    let newText;

    if (!isErasing && !isReversing) {
      newText = originalText.substring(0, currentIndex);
      currentIndex++;
      if (newText === originalText) isErasing = true;
    } else if (isErasing) {
      newText = originalText.substring(0, currentIndex);
      currentIndex--;
      if (newText === "") {
        isErasing = false;
        isReversing = true;
        currentIndex = 0;
      }
    } else if (isReversing) {
      newText = replacementText.substring(0, currentIndex);
      currentIndex++;
      if (newText === replacementText) {
        isReversing = false;
        currentIndex = 0;
      }
    }

    textElement.textContent = newText;
    animationFrameId = setTimeout(animateText, 900);
  }


  // Démarrer l'animation une fois le DOM chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateText);
  } else {
    animateText();
  }

  // Animation au clic sur les liens de navigation
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Ajouter une classe pour l'animation
      this.classList.add('nav-link-clicked');
      
      // Retirer la classe après l'animation
      setTimeout(() => {
        this.classList.remove('nav-link-clicked');
      }, 300);
    });
  });

  // Protection des images de logos contre la copie
  const logoImages = document.querySelectorAll('#logos .logos-grid img');
  
  logoImages.forEach(img => {
    // Bloquer le clic droit
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Bloquer le glisser-déposer
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Bloquer la sélection
    img.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Ajouter une couche de protection supplémentaire
    img.setAttribute('draggable', 'false');
    img.style.pointerEvents = 'auto';
  });

  // Bloquer les raccourcis clavier sur la section logos
  const logosSection = document.getElementById('logos');
  if (logosSection) {
    logosSection.addEventListener('keydown', function(e) {
      // Bloquer Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+P, F12, etc.
      if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        return false;
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
        e.preventDefault();
        return false;
      }
    });
    
    // Bloquer le menu contextuel sur toute la section
    logosSection.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
  }
})();
