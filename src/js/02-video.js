import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const savePlayerTime = ({ seconds }) => {
  localStorage.setItem(LOCALSTORAGE_KEY, seconds);
};

const loadPlayerTime = () => {
  return localStorage.getItem(LOCALSTORAGE_KEY) || 0;
};

player
  .setCurrentTime(loadPlayerTime())
  .then(function (seconds) {
    console.log(`Set current time: ${seconds} seconds`);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'The time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        console.log('Some other error occurred');
        break;
    }
  });

player.on('timeupdate', throttle(savePlayerTime, 1000));
