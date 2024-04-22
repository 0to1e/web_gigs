const track = document.getElementById("image-track");

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt == 0) {
    return;
  }
  const mouseDelta = e.clientX - parseFloat(track.dataset.mouseDownAt);
  maxDelta = window.innerWidth / 2;

  let percentage = (mouseDelta / maxDelta) * 100;
  percentage = Math.min(100, Math.max(-100, percentage));
  let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
  track.dataset.percentage = nextPercentage;
  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 5000, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${nextPercentage + 100}% 50%`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = (e) => {
  track.dataset.mouseDownAt = 0;
  track.dataset.prevPercentage = track.dataset.percentage;
};
