  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = 448;
  canvas.height = 400;

  function draw() {
    window.requestAnimationFrame(draw)
  }

  draw()

