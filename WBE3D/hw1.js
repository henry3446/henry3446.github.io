let lightNO = document.getElementById("lightNO");
let allLightlight = document.querySelectorAll(".light");

let state = true;
let intervalArr = [];
lightGlow();
lightNO.addEventListener("click", function (e) {
  state = !state;
  if (state) {
    lightNO.innerText = "關";
  } else {
    lightNO.innerText = "開";
  }
  lightGlow();
});

function lightGlow() {
  if (state) {
    clearAllInterval();
    allLightlight.forEach((element) => {
      intervalArr.push(
        setInterval(function () {
          element.classList.toggle("lightOn");
        }, Math.floor(Math.random() * 1000) + 1000)
      );
    });
  } else {
    clearAllInterval();
  }
}
function clearAllInterval() {
  for (let i = 0; i < allLightlight.length; i++) {
    allLightlight[i].classList.remove("lightOn");
  }
  for (let i = 0; i < intervalArr.length; i++) {
    clearInterval(intervalArr[i]);
  }
  intervalArr = [];
}
