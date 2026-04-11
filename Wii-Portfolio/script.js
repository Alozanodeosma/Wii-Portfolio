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
    channelHover.volume = 0.2;
    channelHover.play()
});
});
