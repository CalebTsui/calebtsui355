console.log("scrip.js loaded");

const fly = document.getElementById("fly");
console.log("Fly is:", fly); // 👈 test if it's found

let angle = 0;
function buzz() {
  angle += 0.1;

  const dx = Math.sin(angle * 5) * 5;
  const dy = Math.cos(angle * 3) * 3;

  fly.setAttribute("transform", `translate(${dx}, ${dy})`);
  requestAnimationFrame(buzz);
}

buzz();