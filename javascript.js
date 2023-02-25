const wheelValues = [
  {
    id: "detect_1",
    probability: 10,
    label: "smile emoji",
    image: "$",
    gift: 50,
    background_color: "#ff1f1f",
  },
  {
    id: "detect_2",
    probability: 10,
    label: "tongue emoji",
    image: "😝",
    gift: 0,
    background_color: "#19e3cf",
  },
  {
    id: "detect_3",
    probability: 10,
    label: "in love emoji",
    image: "😍",
    gift: 5,
    background_color: "#9e0bf3",
  },
  {
    id: "detect_4",
    probability: 10,
    label: "glasses emoji",
    image: "",
    gift: 0,
    background_color: "#15b600",
  },
  {
    id: "detect_5",
    probability: 10,
    label: "donut emoji",
    image: "🍩",
    gift: 10,
    background_color: "#1f26ff",
  },
  {
    id: "detect_6",
    probability: 10,
    label: "lollipop emoji",
    image: "🍭",
    gift: 0,
    background_color: "#ff5a5a",
  },
  {
    id: "detect_7",
    probability: 0,
    label: "cake emoji",
    image: "🍰",
    gift: 50,
    background_color: "#57fff1",
  },
  {
    id: "detect_8",
    probability: 40,
    label: "sweet emoji",
    image: "🍬",
    gift: 5,
    background_color: "#ff9612",
  },
];
function spinWheel() {
  // Get a random number of degrees for the wheel to spin
  const x = 5000; //min value
  const y = 30000; //max value

  let degreesToSpin = Math.floor(Math.random() * (x - y)) + y; // spin at least 2 times (720 degrees)

  // Get the wheel element and apply the spin animation
  const wheel = document.getElementById("wheel");
  wheel.style.transform = `rotate(${degreesToSpin}deg)`; // apply the rotation

  // Play sound loop while wheel is spinning
  const sound = document.getElementById("spin-sound");
  sound.playbackRate = 1;
  sound.loop = true;
  sound.play();
  slowDownAudio(sound);

  // After the animation completes, determine which wheel section is overlapping the arrow
  setTimeout(() => {
    // Stop the sound loop
    // audio.pause();
    // audio.currentTime = 0;

    const pointer = document.getElementById("pointer");
    const wheelSections = document.querySelectorAll(".detection");

    // Get the position of the pointer element
    const pointerRect = pointer.getBoundingClientRect();
    const pointerX = pointerRect.left + pointerRect.width / 2;
    const pointerY = pointerRect.top + pointerRect.height / 2;

    // Check which wheel section contains the pointer position
    let overlappingSection = null;
    wheelSections.forEach((section) => {
      const sectionRect = section.getBoundingClientRect();
      if (
        pointerX >= sectionRect.left &&
        pointerX <= sectionRect.right &&
        pointerY >= sectionRect.top &&
        pointerY <= sectionRect.bottom
      ) {
        overlappingSection = section;
      }
    });

    // Find the corresponding wheelValues item based on the overlapping section
    const sect = wheelValues.find(
      (element) => element.id === overlappingSection.attributes.id.value
    );
    console.log("Overlapping item:", sect);
  }, 4000); // wait for 4 seconds (same as animation duration)
}

function slowDownAudio(sound) {
  const easingFunc = cubicBezier(0, 0, 0, 1);
  let startTime = null;
  let startRate = sound.playbackRate;
  const duration = 4080;

  function updatePlaybackRate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    if (elapsedTime < duration) {
      const progress = elapsedTime / duration;
      const newRate = startRate - (startRate - 0.5) * easingFunc(progress);
      sound.playbackRate = newRate;
      requestAnimationFrame(updatePlaybackRate);
    } else {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  requestAnimationFrame(updatePlaybackRate);
}

function cubicBezier(p0, p1, p2, p3) {
  function b(t) {
    return (
      (1 - t) ** 3 * p0 +
      3 * (1 - t) ** 2 * t * p1 +
      3 * (1 - t) * t ** 2 * p2 +
      t ** 3 * p3
    );
  }
  return b;
}
