const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// ? song titles array
const songs = ['harmony', 'islandesque','wishing', 'above'];

//? keep track of song - starts on index 2
let songIndex = 2;


loadSong(songs[songIndex]);

//? update song details
function loadSong(song){
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
} 



//?Play song
function playSong(){
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

//?Pause song
function pauseSong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

//? Previous song funcion 


function prevSong(){
  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length -1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// ?Next song

function nextSong(){
  songIndex++;

  if(songIndex > songs.length - 1){
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// ?Uptade progressbar
function updateProgress(e){
  const {duration, currentTime} = e.srcElement;
  //* console.log(duration, currentTime);
  const progressPercent = (currentTime/ duration) * 100;
  //* console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
  const progressWidth = this.clientWidth;
  const progressClick = e.offsetX;
  const songDuration = audio.duration;
  //* console.log(progressWidth);
  //* console.log(progressClick);

  audio.currentTime = (progressClick / progressWidth) * songDuration;
}


playBtn.addEventListener('click', ()=> {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying){
    pauseSong();
  } else {
    playSong();
  }
});


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


//?update Time/song update event
audio.addEventListener('timeupdate', updateProgress);

//? update progress
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);



