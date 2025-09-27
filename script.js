console.log("script.js loaded");

const flies = document.querySelectorAll(".fly");

flies.forEach((fly, index) => {
  let angle = 0;
  const baseTransform = fly.getAttribute("transform") || "translate(0,0)";
  
  // extract starting x,y
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
