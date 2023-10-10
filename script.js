const palabras = [
    "sol",
    "luna",
    "agua",
    "perro",
    "gato",
    "rojo",
    "azul",
    "verde",
    "vino",
    "flor"
];
  
// Función para obtener una palabra aleatoria del arreglo
function obtenerPalabraAleatoria() {
    // Genera un índice aleatorio dentro del rango del arreglo
    const indiceAleatorio = Math.floor(Math.random() * palabras.length);
  
    // Devuelve la palabra correspondiente al índice aleatorio
    return palabras[indiceAleatorio];
}

function desordenarPalabra(palabra) {
    // Convierte la palabra en un arreglo de caracteres
    const arregloLetras = palabra.split('');
  
    // Utiliza el algoritmo de Fisher-Yates para mezclar las letras al azar
    for (let i = arregloLetras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arregloLetras[i], arregloLetras[j]] = [arregloLetras[j], arregloLetras[i]];
    }
  
    // Convierte el arreglo de letras de nuevo en una palabra
    const palabraDesordenada = arregloLetras.join('');
    return palabraDesordenada;
}

let palabra = obtenerPalabraAleatoria()
console.log(desordenarPalabra(palabra))

const wordAnsInput = document.querySelector('.word-ans');

palabraDesordenada = desordenarPalabra(palabra)

wordAnsInput.setAttribute('value', palabraDesordenada);

// Palabra a adivinar
let word = palabra;
let wordArray = word.split('');

// Array para almacenar las letras ingresadas por el usuario
let arrayUser = [];

// Bandera para determinar si el juego ha sido ganado
let won = false;

// Variable que indica el numero de intentos disponibles
const maxTries = 5;
// Contador de intentos
let intentos = 0;

// Función para inicializar el juego
function startGame() {
    // Reiniciar variables
    arrayUser = [];
    won = false;
    intentos = 0;

    // Inicializar el primer row-wordg
    createRowWord();
}

// Función para crear un nuevo row-word y eliminar el anterior
function createRowWord() {
    // Seleccionar el contenedor donde se insertará el row-word
    const containerElement = document.getElementById('container-row-word');

    // Elimina el row-word anterior, si existe dentro del contenedor
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
    // Establecer el enfoque en el primer input
    rowWord.firstChild.focus();
}


// Función para verificar la palabra ingresada por el usuario
function checkWord() {
    intentos++;
    updateTriesDisplay();
    if (arrayUser.join('') !== word) {
        if (intentos >= 5) {
            paintCirclePurple(intentos);
            console.log("perdiste")
            document.getElementById("container-main").style.display = "none";            
            document.getElementById("msj-win-lose").style.display = "block";
        } else {
            // Pintamos el círculo para indicar que desperdiciamos un intento
            paintCirclePurple(intentos);
            arrayUser = [];
            createRowWord(); // Crea un nuevo row-word para continuar adivinando
        }
    } else {
        won = true;
        document.getElementById("container-main").style.display = "none";
        document.getElementById("msj-win-lose").style.display = "flex";
        const intentosElement = document.getElementById('intents');
        intentosElement.textContent = `En ${intentos} Intentos`;
    }
}

// Función para pintar el círculo correspondiente de morado
function paintCirclePurple(attempts) {
    const circles = document.querySelectorAll(".circle");
    if (attempts <= maxTries) {
        circles[attempts - 1].style.backgroundColor = "#672171";
    }
}

function updateTriesDisplay() {
    document.querySelector(".container-tries span").textContent = `Intentos (${intentos}/${maxTries}):`;
}

// Evento para detectar la entrada de texto del usuario
document.addEventListener('input', (event) => {

    if (!won && event.target.classList.contains('square')) {
        arrayUser.push(event.target.value.toLowerCase());
        if (event.target.nextElementSibling) {
            event.target.nextElementSibling.focus();
        } else {
            checkWord(); // Verificar la palabra cuando se completen todos los campos
        }
    }
});

// Iniciar el juego al cargar la página
startGame();
