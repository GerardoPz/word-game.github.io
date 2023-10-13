// Arreglo de palabras
const palabras = [
  'sol',
  'luna',
  'agua',
  'perro',
  'gato',
  'rojo',
  'azul',
  'verde',
  'vino',
];

// Función para obtener una palabra aleatoria del arreglo
function obtenerPalabraAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * palabras.length);
  return palabras[indiceAleatorio];
}

// Función para desordenar una palabra
function desordenarPalabra(palabra) {
  const arregloLetras = palabra.split('');

  for (let i = arregloLetras.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arregloLetras[i], arregloLetras[j]] = [arregloLetras[j], arregloLetras[i]];
  }

  const palabraDesordenada = arregloLetras.join('');

  return palabraDesordenada;
}

// Inicialización de la palabra y elementos HTML
let palabra = obtenerPalabraAleatoria();
const wordAnsInput = document.querySelector('.word-ans');
let palabraDesordenada = desordenarPalabra(palabra);
wordAnsInput.setAttribute('value', palabraDesordenada);

// Palabra a adivinar y variables del juego
let word = palabra;
let wordArray = word.split('');
let arrayUser = [];
let won = false;
const maxTries = 5;
let intentos = 0;

// Función para inicializar el juego
function startGame() {
  arrayUser = [];
  won = false;
  intentos = 0;
  createRowWord();
}

// Función para crear un nuevo row-word y eliminar el anterior
function createRowWord() {
  const containerElement = document.getElementById('container-row-word');
  let existingRowWord = containerElement.querySelector('.row-word');
  if (existingRowWord) {
    existingRowWord.remove();
  }
  let newRowWord = document.createElement('div');
  newRowWord.className = 'row-word';
  containerElement.appendChild(newRowWord);
  createInput(wordArray, newRowWord);
}

// Función para crear los cuadros de entrada
function createInput(array, rowWord) {
  rowWord.innerHTML = '';
  array.forEach(() => {
    let input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.className = 'square';
    rowWord.appendChild(input);
  });
  rowWord.firstChild.classList.add('focus');
  rowWord.firstChild.focus();
}

// Función para verificar la palabra ingresada por el usuario
function checkWord() {
  intentos++;
  updateTriesDisplay();
  if (arrayUser.join('') !== word) {
    if (intentos >= maxTries) {
      paintCirclePurple(intentos);
      document.getElementById('container-main').style.display = 'none';
      document.getElementById('msj-win-lose').style.display = 'flex';
      let winMessage = document.getElementById('win-lose');
      let intentosElement = document.getElementById('intents');
      winMessage.textContent = `PERDISTE`;
      intentosElement.textContent = `AGOTASTE TODOS LOS INTENTOS`;
    } else {
      paintCirclePurple(intentos);
      arrayUser = [];
      createRowWord();
    }
  } else {
    won = true;
    document.getElementById('container-main').style.display = 'none';
    document.getElementById('msj-win-lose').style.display = 'flex';
    let winMessage = document.getElementById('win-lose');
    let intentosElement = document.getElementById('intents');
    winMessage.textContent = `GANASTE FELICIDADES`;
    intentosElement.textContent = `En ${intentos} Intentos`;
  }
}

// Función para pintar el círculo correspondiente de morado
function paintCirclePurple(attempts) {
  const circles = document.querySelectorAll('.circle');
  if (attempts <= maxTries) {
    circles[attempts - 1].classList.add('circle-purple');
  }
}

// Función para actualizar la visualización de intentos
function updateTriesDisplay() {
  document.querySelector(
    '.container-tries span',
  ).textContent = `Intentos (${intentos}/${maxTries}):`;
}

// Evento para detectar la entrada de texto del usuario
document.addEventListener('input', (event) => {
  if (!won && event.target.classList.contains('square')) {
    arrayUser.push(event.target.value.toLowerCase());
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.focus();
    } else {
      checkWord();
    }
  }
});

// Obtén una referencia al botón "Random" por su ID
const randomButton = document.getElementById('random');

// Agrega un evento clic al botón "Random"
randomButton.addEventListener('click', () => {
  palabra = obtenerPalabraAleatoria();
  palabraDesordenada = desordenarPalabra(palabra);
  wordAnsInput.setAttribute('value', palabraDesordenada);
  word = palabra;
  wordArray = word.split('');
  intentos = 0;
  updateTriesDisplay();
  const circles = document.querySelectorAll('.circle');
  circles.forEach((circle) => {
    circle.classList.add('circle-gray');
  });
  circles.forEach((circle) => {
    circle.classList.remove('circle-purple');
  });
  startGame();
});

// Obtén una referencia al botón "Reset" por su ID
const resetButton = document.getElementById('reset');

// Agrega un evento clic al botón "Reset"
resetButton.addEventListener('click', () => {
  intentos = 0;
  updateTriesDisplay();
  createRowWord();
  const circles = document.querySelectorAll('.circle');
  circles.forEach((circle) => {
    circle.classList.add('circle-gray');
  });
  circles.forEach((circle) => {
    circle.classList.remove('circle-purple');
  });
});

// Obtén una referencia al botón "Reiniciar Juego" por su ID
const reiniciarButton = document.getElementById('reiniciar-juego');

// Agrega un evento clic al botón "Reiniciar Juego"
reiniciarButton.addEventListener('click', reiniciarJuego);

// Función para reiniciar el juego
function reiniciarJuego() {
  // Restablece las variables y elementos del juego
  palabra = obtenerPalabraAleatoria();
  palabraDesordenada = desordenarPalabra(palabra);
  wordAnsInput.setAttribute('value', palabraDesordenada);
  word = palabra;
  wordArray = word.split('');
  arrayUser = [];
  won = false;
  intentos = 0;
  updateTriesDisplay();
  document.getElementById('msj-win-lose').style.display = 'none';
  document.getElementById('container-main').style.display = 'flex';

  // Restablece la visualización de los círculos
  const circles = document.querySelectorAll('.circle');
  circles.forEach((circle) => {
    circle.classList.add('circle-gray');
    circle.classList.remove('circle-purple');
  });

  console.log('REINICIASTE');

  // Inicializa el juego
  startGame();
}

// Llama a la función comenzarJuego para iniciar el juego automáticamente al cargar la página
startGame();
