const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");
const message = document.getElementById("message");
const buttonZone = document.getElementById("buttonZone");

const noLines = [
  "No button is buffering... romance servers are busy 💅",
  "Error 404: rejection not found.",
  "Nice try, future wife. Try again 😌",
  "This button has resigned from its job.",
  "iOS security blocked this bad decision.",
  "No is currently on vacation. Yes is available though.",
  "The No button got shy and ran away 🏃‍♀️💨",
  "Access denied: too cute to reject."
];

let noAttempts = 0;

function moveNoButton() {
  noAttempts += 1;

  const zone = buttonZone.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 8;
  const maxLeft = Math.max(padding, zone.width - btn.width - padding);
  const maxTop = Math.max(62, zone.height - btn.height - padding);

  const randomLeft = padding + Math.random() * (maxLeft - padding);
  const randomTop = 60 + Math.random() * (maxTop - 60);

  noBtn.style.left = `${randomLeft}px`;
  noBtn.style.top = `${randomTop}px`;
  noBtn.style.transform = "translateX(0)";
  noBtn.classList.add("running");

  hint.textContent = noLines[(noAttempts - 1) % noLines.length];

  if (noAttempts >= 5) {
    noBtn.textContent = "No machine broke 😭";
  }

  setTimeout(() => noBtn.classList.remove("running"), 180);
}

// On mobile Safari, touchstart makes the joke happen before a real tap can land.
["touchstart", "pointerenter", "mouseenter", "click"].forEach((eventName) => {
  noBtn.addEventListener(eventName, (event) => {
    event.preventDefault();
    moveNoButton();
  }, { passive: false });
});

yesBtn.addEventListener("click", () => {
  yesBtn.textContent = "Date confirmed 💖";
  noBtn.style.opacity = "0";
  noBtn.style.pointerEvents = "none";
  hint.textContent = "Excellent decision. The romance department approves.";
  message.classList.remove("hidden");
  launchConfetti();
});

function launchConfetti() {
  const emojis = ["💖", "💕", "💘", "💍", "✨", "🥰"];
  for (let i = 0; i < 34; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.fontSize = `${18 + Math.random() * 14}px`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3400);
  }
}
