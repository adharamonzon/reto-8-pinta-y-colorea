'use strict';

const canvas = document.querySelector('#draw');

canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight; //para que el ancho y alto del canvas sea siempre ajustado a la pantalla del navegador

const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#BADASS'; //especifica el color o patro para las lineas exteriores de las formas
ctx.lineJoin = 'round'; //determina la forma para unir dos segmentos de una línea cuando coinciden.
ctx.lineCap = 'round'; // determina la forma usada para dibujar los puntos finales de las líneas.
ctx.lineWidth = 50;
ctx.globalCompositeOperation = 'overlay';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = (ev) => {
  if (!isDrawing) return; //para la funcion de pintar cuando el raton no está clickado
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; //añade el arcoíris como colores
  ctx.beginPath(); //crea una nueva ruta
  // aquí comienza
  ctx.moveTo(lastX, lastY); //se mueve a las coordenadas especificadas
  // va hacía
  ctx.lineTo(ev.offsetX, ev.offsetY); //añade una linea a la nueva ruta, con las coordenadas del raton especificadas en el evento
  ctx.stroke(); //pinta las líneas con el path dado y el color dado anteriormente.
  [lastX, lastY] = [ev.offsetX, ev.offsetY]; // así no empieza desde 0 siempre. (sintaxis destructuring)

  //colores
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  //tamaño
  if (ctx.lineWidth >= 60 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
};

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (ev) => {
  isDrawing = true;
  [lastX, lastY] = [ev.offsetX, ev.offsetY];
});
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
