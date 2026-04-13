//Clock and Date management
const dateUI = document.getElementById("date");
const clockUI = document.getElementById("clock");

const date = new Date();
const options = { weekday: 'short', month: 'numeric', day: 'numeric' };

dateUI.innerHTML = date.toLocaleDateString('en-US', options).replace(',', '');
clockUI.innerHTML = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

const seconds = date.toLocaleTimeString('en-US', {second: "numeric"})
let firstInterval = 60000 - (seconds * 1000)

setTimeout(() => {
  updateTime()
  setInterval(updateTime, 60000)
}, firstInterval)

function updateTime() {
  const date = new Date();
  clockUI.innerHTML = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

//Music management
const menuMusic = new Audio("/resources/audio/music/menuMusic.mp3");
const startMusic = () => {
  menuMusic.play();
  menuMusic.volume = 0.5;
  menuMusic.loop = true;
  document.getElementById("disclaimer").style.display = "none";
  document.removeEventListener("click", startMusic);
  document.removeEventListener("keydown", startMusic);
};

document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);

//Sound effects management
const channelHover = new Audio("/resources/audio/sfx/iconHoverSfx.wav");
const cards = document.querySelectorAll(".cards");
cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    channelHover.currentTime = 0;
    channelHover.volume = 0.1;
    channelHover.play()
});
});

//Card fullscreen transition management
const blackBackground = document.getElementById("black-background");
cards.forEach(card => {
  card.addEventListener("click", () => {
    const first = card.getBoundingClientRect();
    card.classList.toggle("cards-fullscreen");

    const last = card.getBoundingClientRect();

    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const scaleX = first.width / last.width;
    const scaleY = first.height / last.height;

    card.style.transition = "none";
    card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
    card.style.transformOrigin = "top left";
    blackBackground.style.backgroundColor = card.classList.contains("cards-fullscreen") ? "transparent" : "black";  

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.transition = "transform 0.5s ease-out, background-color 0.6s ease-out";
        card.style.transform = "";
        blackBackground.style.backgroundColor = card.classList.contains("cards-fullscreen") ? "black" : "transparent";  
        blackBackground.style.transition = "background-color 0.5s ease-out";
    });
  });
});
});