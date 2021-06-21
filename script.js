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
const trackList = document.querySelector('.track-list');

let trackIndex = 0;

// On page load
loadTrack(tracks[trackIndex]);
loadTrackList();
audio.volume = 0.5;

// Script functions ============================================================
function loadTrack(track, index=trackIndex) {
  title.innerText = `${track.artist} - ${track.title}`;
  cover.src = track.image ?? 'images/default.jpg';
  audio.src = track.url;
}

function loadTrackList() {
  let listItem, imgElem, titleElem;

  tracks.forEach((track, index) => {
    listItem = document.createElement('div');
    imgElem = document.createElement('img');
    titleElem = document.createElement('span');

    imgElem.src = track.image ?? 'images/default.jpg';
    titleElem.innerText = `${track.artist} - ${track.title}`;
    listItem.classList.add('track');
    
    listItem.addEventListener('click', () => {
      trackIndex = index;
      loadTrack(track);
      playTrack();
    });

    listItem.appendChild(imgElem);
    listItem.appendChild(titleElem);
    trackList.appendChild(listItem);
  });
}

function playTrack() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
  document.title = tracks[trackIndex].title;
}

function pauseTrack() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
  document.title = 'Music Player';
}

function prevTrack() {
  trackIndex--;

  if (trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }

  loadTrack(tracks[trackIndex]);
  playTrack();
}

function nextTrack(noLoop=false) {
  trackIndex++;

  if (trackIndex >= tracks.length) {
    trackIndex = 0;

    if (noLoop) {
      loadTrack(tracks[trackIndex]); // load first track
      pauseTrack(); return;
    };
  }
  
  loadTrack(tracks[trackIndex]);
  playTrack();
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
    pauseTrack();
  } else {
    playTrack();
  }
});

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

volumeContainer.addEventListener('click', setVolume);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => nextTrack(true));

progressContainer.addEventListener('click', setProgress);