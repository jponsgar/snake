// Definicion variables
const canvas = document.getElementById('juegoSerpiente');
const ctx = canvas.getContext('2d');
const botonSt = document.getElementById('botonStart');
const puntosDisplay = document.getElementById('puntos');
const selectorVeloz = document.getElementById('veloz');
const cuadro = 20;
let serpiente = [{x: 200, y: 200}];
let dx = cuadro;
let dy = 0;
let manzana = {x: Math.floor(Math.random() * 20) * cuadro, y: Math.floor(Math.random() * 20) * cuadro};
let juego;
let puntos = 0;

// Eventos listener para boton Start del juego y flechas teclado
botonSt.addEventListener('click', empiezoJ);
document.addEventListener('keydown', cambioDireccion);

function empiezoJ() {
  // Reset juego
  serpiente = [{x: 200, y: 200}];
  dx = cuadro;
  dy = 0;
  manzana = {x: Math.floor(Math.random() * 20) * cuadro, y: Math.floor(Math.random() * 20) * cuadro};
  puntos = 0;

  // Limpia intervalo juego
  if (juego) {
    clearInterval(juego);
  }
  
  // Velocidad juego
    velo = parseInt(selectorVeloz.value);

    // Empiezo juego
    juego = setInterval(dibujo, velo);
}

function cambioDireccion(e) {
  if (e.keyCode === 37 && dx !== cuadro) { // flecha izquierda
    dx = -cuadro;
    dy = 0;
  } else if (e.keyCode === 38 && dy !== cuadro) { // flecha arriba
    dx = 0;
    dy = -cuadro;
  } else if (e.keyCode === 39 && dx !== -cuadro) { // flecha derecha
    dx = cuadro;
    dy = 0;
  } else if (e.keyCode === 40 && dy !== -cuadro) { // flecha abajo
    dx = 0;
    dy = cuadro;
  }
}

function dibujo() {
  // Borra todo el area del cuadrado
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background blanco
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujo manzana
  ctx.fillStyle = 'red';
  ctx.fillRect(manzana.x, manzana.y, cuadro, cuadro);

  // Dibujo serpiente
  ctx.fillStyle = 'green';
  serpiente.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, cuadro, cuadro);
  });

  // Mueve serpiente
  const cabeza = {x: serpiente[0].x + dx, y: serpiente[0].y + dy};
  serpiente.unshift(cabeza);

  // Comprueba si la serpiente come manzana
  if (cabeza.x === manzana.x && cabeza.y === manzana.y) {
    manzana = {x: Math.floor(Math.random() * 20) * cuadro, y: Math.floor(Math.random() * 20) * cuadro};
    puntos++;
  } else {
    serpiente.pop();
  }

  // Comprueba si la serpiente colisiona con el limite o ella misma, entonces finaliza juego
  if (cabeza.x < 0 || cabeza.x >= canvas.width || cabeza.y < 0 || cabeza.y >= canvas.height || colision()) {
    clearInterval(juego);
    alert("Game Over! Manzanas comidas: " + puntos);
  }
}

// Colision con ella misma
function colision() {
  return serpiente.slice(1).some(segment => segment.x === serpiente[0].x && segment.y === serpiente[0].y);
}

