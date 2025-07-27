
  const textElement = document.getElementById("nom");
  const originalText = "iaan";
  const replacementText = "n";
  let currentIndex = 0;
  let isErasing = false;
  let isReversing = false;

  function animateText() {
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

    textElement.innerHTML = newText;
    setTimeout(animateText, 900); // Réduit le délai à 100 ms
  }

  animateText();

//   const images = [
//     'img/pp.png',
//     'img/pp5.png',
//     'img/pp2.png',
//     'img/pp3.png',
//     'img/pp4.png'
// ];

// let currentImageIndex = 0;
// const imageElement = document.getElementById('ppportoflio');

// setInterval(() => {
//     imageElement.classList.add('fade-out');

//     setTimeout(() => {
//         currentImageIndex = (currentImageIndex + 1) % images.length;
//         imageElement.src = images[currentImageIndex];
//         imageElement.classList.remove('fade-out');
//     }, 1000);
// }, 4000);
