import {pointAPI} from "../../../../../api/pointAPI";

export function drawCanvas(r) {
  let fillColor = "#2b602b"
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  //очистка
  context.clearRect(0, 0, canvas.width, canvas.height);

  //прямоугольник
  context.beginPath();
  context.rect(150, 150, 130, 130);
  context.closePath();
  context.strokeStyle = fillColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();

  // сектор
  context.beginPath();
  context.moveTo(150, 150);
  context.arc(150, 150, 130, Math.PI /2, Math.PI);
  context.closePath();
  context.strokeStyle = fillColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();

  //треугольник
  context.beginPath();
  context.moveTo(150, 150);
  context.lineTo(150, 150 - 65);
  context.lineTo(85, 150);
  context.lineTo(150, 150);
  context.closePath();
  context.strokeStyle = fillColor;
  context.fillStyle = fillColor;
  context.fill();
  context.stroke();

  //отрисовка осей
  context.beginPath();
  context.font = "10px Verdana";
  context.moveTo(150, 0);
  context.lineTo(150, 300);
  context.moveTo(150, 0);
  context.lineTo(145, 15);
  context.moveTo(150, 0);
  context.lineTo(155, 15);
  context.strokeStyle = "#000000";
  context.fillStyle = "#000000";
  context.fillText("Y", 160, 10);
  context.moveTo(0, 150);
  context.lineTo(300, 150);
  context.moveTo(300, 150);
  context.lineTo(285, 145);
  context.moveTo(300, 150);
  context.lineTo(285, 155);
  context.fillText("X", 290, 135);

  // деления X
  context.moveTo(145, 20);
  context.lineTo(155, 20);
  context.fillText(r, 160, 20);
  context.moveTo(145, 85);
  context.lineTo(155, 85);
  context.fillText((r / 2), 160, 78);
  context.moveTo(145, 215);
  context.lineTo(155, 215);
  context.fillText(-(r / 2), 160, 215);
  context.moveTo(145, 280);
  context.lineTo(155, 280);
  context.fillText(-r, 160, 280);
  // деления Y
  context.moveTo(20, 145);
  context.lineTo(20, 155);
  context.fillText(-r, 20, 170);
  context.moveTo(85, 145);
  context.lineTo(85, 155);
  context.fillText(-(r / 2), 70, 170);
  context.moveTo(215, 145);
  context.lineTo(215, 155);
  context.fillText((r / 2), 215, 170);
  context.moveTo(280, 145);
  context.lineTo(280, 155);
  context.fillText(r, 280, 170);

  context.closePath();
  context.strokeStyle = "black";
  context.fillStyle = "black";
  context.stroke();


}

function convertX(x,r){
  if (r===0){
    return 150
  }
  return x/r*130+150;

}
function convertY(y,r) {
  if (r === 0){
    return 150
  }
  return 150-y/r*130;
}

function drawPoint(point, r){
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  context.beginPath();
  context.ellipse(convertX(point.x,r) , convertY(point.y,r) , 4, 4, 1, 0, 2 * Math.PI, true);
  context.closePath();
  if (point.isIn === "true") {
    context.strokeStyle = "#20ff00";
    context.fillStyle = "#20ff00";
  } else {
    context.strokeStyle = "#dc3545";
    context.fillStyle = "#dc3545";
  }
  context.fill();
  context.stroke();

}

export function drawPoints(points, r){
  points.forEach((value) => {
    drawPoint(value, r)
  })
}

export function getCoords(r_inp) {

  let elem = document.getElementById("canvas");
  let br = elem.getBoundingClientRect();
  let left = br.left;
  let top = br.top;
  let event = window.event;
  let x = event.clientX - left;
  let y = event.clientY - top;
  let transf_x = Math.trunc((r_inp * (x - 150) / 130)*10000)/10000;
  let transf_y = Math.trunc((r_inp * (150 - y) / 130)*10000)/10000;
  return(
    [transf_x,transf_y]
  )
}