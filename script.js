const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const volume = document.querySelector('.volume');
const volumeContainer = document.querySelector('.volume-container');
const songList = document.querySelector('.song-list');

const songs = [
  'SMB - Theme', 'SMB - Underground', 'SMB - Underwater',
  'SMB 2 - Theme', 'SMB 3 - Fortress', 'SMB 3 - Grass Land',
  'SMB 3 - King',
];

const covers = ['Mario', 'Coin', '1UP', 'Mushroom', 'Fireball', 'Feather', 'Flower'];

let songIndex = 0;

// On page load
loadSong(songs[songIndex]);
loadSongList();
audio.volume = 0.5;

// Script functions ============================================================
function loadSong(song, index=songIndex) {
  title.innerText = song;
  cover.src = `images/${covers[index]}.png`;
  audio.src = `music/${song}.mp3`;
}

function loadSongList() {
  let listItem, imgElem, titleElem;

  songs.forEach((song, index) => {
    listItem = document.createElement('div');
    imgElem = document.createElement('img');
    titleElem = document.createElement('span');

    imgElem.src = `images/${covers[index]}.png`;
    titleElem.innerText = song;
    listItem.classList.add('song');
    
    listItem.addEventListener('click', () => {
      songIndex = index;
      loadSong(song);
      playSong();
    });

    listItem.appendChild(imgElem);
    listItem.appendChild(titleElem);
    songList.appendChild(listItem);
  });
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
  document.title = songs[songIndex];
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
  document.title = 'Music Player';
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  
  audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
  const height = this.clientHeight;
  const clickY = e.offsetY;
  const level = (height - clickY) / height;

  audio.volume = level > 1 ? 1 : level;
  volume.style.height = `${level * 100}%`;
}

// Event listeners =============================================================
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

volumeContainer.addEventListener('click', setVolume, true);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgress);