console.log("script.js loaded");

/* flies stuff */ 
const flies = document.querySelectorAll(".fly");

flies.forEach((fly, index) => {
  let angle = 0;
  const baseTransform = fly.getAttribute("transform") || "translate(0,0)";
  
  const match = baseTransform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
  const baseX = match ? parseFloat(match[1]) : 0;
  const baseY = match ? parseFloat(match[2]) : 0;

  function buzz() {
    angle += 0.05;

    const dx = Math.sin(angle * 5 + index) * 5;
    const dy = Math.cos(angle * 3 + index) * 3;

    fly.setAttribute("transform", `translate(${baseX + dx}, ${baseY + dy})`);
    requestAnimationFrame(buzz);
  }

  buzz();
});

/* frog */ 
const frog = document.getElementById("frog");
const frogSound = document.getElementById("frogSound");

frog.style.cursor = "pointer";

frog.addEventListener("click", () => {

  frogSound.currentTime = 0;
  frogSound.play();

  frog.classList.add("bouncing");

  frog.addEventListener("animationend", () => {
    frog.classList.remove("bouncing");
  }, { once: true });
});

/* bar chart tooltip */ 
const bars = document.querySelectorAll('.bar');
const tooltip = document.getElementById('tooltip');

bars.forEach(bar => {
  bar.addEventListener('mousemove', e => {
    const value = bar.getAttribute('data-value');
    tooltip.textContent = `${value} people`;

    tooltip.style.left = e.pageX + 20 + 'px';
    tooltip.style.top = e.pageY - 20 + 'px';
    tooltip.style.opacity = 1;
  });

  bar.addEventListener('mouseleave', () => {
    tooltip.style.opacity = 0;
  });
});


