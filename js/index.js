const stages = document.querySelectorAll("#hangman *");
let palabraCorrecta;
let palabraCorrectaArray;
let palabraSecreta;
const palabraSecretaElemento = document.querySelector(".palabraSecreta");
let errores = -1;
const resultado = document.querySelector(".resultado");
const elementoTeclado = document.querySelector(".botones");

const getPalabraAleatoria = async () => {
  const response = await fetch("http://localhost:3001/palabras");
  const json = await response.json();
  const numeroRandom = Math.floor(Math.random() * json.lista.length);
  palabraCorrecta = await json.lista[numeroRandom];
  palabraSecreta = palabraCorrecta.split("");
  palabraCorrectaArray = [...palabraSecreta];

  for (let indice in palabraSecreta) {
    if (!(palabraSecreta[indice] === " ")) {
      palabraSecreta[indice] = "_";
    }
  }

  pintarPalabraSecreta();
};

const letras = "qwertyuiopasdfghjklñzxcvbnm";
const generaTeclado = () => {
  const letrasSeparadas = letras.split("");

  for (const letra of letrasSeparadas) {
    const boton = document.createElement("BUTTON");
    boton.textContent = letra;
    boton.name = letra;
    boton.value = letra;

    boton.addEventListener("click", ({ target }) => {
      target.disabled = true;
      comprobarLetra(target.value);
    });

    elementoTeclado.appendChild(boton);
  }
};

const pintarPalabraSecreta = () => {
  palabraSecretaElemento.textContent = palabraSecreta.join(" ");
};

const comprobarLetra = (letra) => {
  if (palabraCorrecta.includes(letra)) {
    for (const index in palabraCorrectaArray) {
      if (palabraCorrectaArray[index].toLowerCase() === letra.toLowerCase())
        palabraSecreta[index] = letra.toLowerCase();
    }
    pintarPalabraSecreta();
    comprobarGanador();
  } else {
    ++errores;
    avanzarError(errores);
  }
};

const avanzarError = (errores) => {
  if (errores >= 10) {
    resultado.textContent = "PERDISTE";
    deshabilitarBotones();
  } else {
    stages[errores].classList.remove("d-none");
  }
};
const comprobarGanador = () => {
  if (palabraCorrecta.toLowerCase() === palabraSecreta.join("").toLowerCase()) {
    resultado.textContent = "GANASTE MAKINA";
    deshabilitarBotones();
  }
};

const deshabilitarBotones = () => {
  botones = elementoTeclado.querySelectorAll("*");
  for (const boton of botones) {
    boton.disabled = true;
  }
};

(() => {
  getPalabraAleatoria();
  generaTeclado();
})();
