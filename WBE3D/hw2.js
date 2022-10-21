let Vx = document.getElementById("Vx");
let Vy = document.getElementById("Vy");
let Vz = document.getElementById("Vz");
let Wx = document.getElementById("Wx");
let Wy = document.getElementById("Wy");
let Wz = document.getElementById("Wz");
let dot = document.getElementById("dot");
let X2 = document.getElementById("X2");
let Y2 = document.getElementById("Y2");
let Z2 = document.getElementById("Z2");
let button = document.getElementById("button");

button.addEventListener("click", function (e) {
  var v = new THREE.Vector3(
    parseInt(Vx.value),
    parseInt(Vy.value),
    parseInt(Vz.value)
  );
  var w = new THREE.Vector3(
    parseInt(Wx.value),
    parseInt(Wy.value),
    parseInt(Wz.value)
  );
  var dotProduct = v.clone().dot(w.clone());
  var crossProduct = v.clone().cross(w.clone());
  dot.value = dotProduct;
  X2.value = crossProduct.x;
  Y2.value = crossProduct.y;
  Z2.value = crossProduct.z;
});
