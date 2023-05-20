const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const forwardBtn = document.getElementById('forward-btn');
const skipBtn = document.getElementById('skip-btn');
const form = document.getElementById('play-song-form');
const songNameInput = document.getElementById('song-name-input');
const forwardSecondsInput = document.getElementById('forward-seconds-input');

playBtn.addEventListener('click', () => {
    const songName = prompt('Enter the song name:');
    if (songName) {
        songNameInput.value = songName;
        form.submit();
    }
});

pauseBtn.addEventListener('click', () => {
    const data = {
        command: 'pause'
    };
    sendCommand(data);
});

nextBtn.addEventListener('click', () => {
    const songName = prompt('Enter the song name:');
    if (songName) {
        songNameInput.value = songName;
        const data = {
            command: 'next'
        };
        sendCommand(data);
    }
});

forwardBtn.addEventListener('click', () => {
    const seconds = forwardSecondsInput.value;
    const data = {
        command: 'forward',
        seconds: seconds
    };
    sendCommand(data);
});

skipBtn.addEventListener('click', () => {
    const data = {
        command: 'skip'
    };
    sendCommand(data);
});

function sendCommand(data) {
    const songName = songNameInput.value;
    if (songName) {
        data.song_name = songName;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/play-song/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            console.log(xhr.response);
        };
        xhr.send(JSON.stringify(data));
    } else {
        alert('Please enter a song name.');
    }
}