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

player.setCurrentTime(loadPlayerTime());

player.on('timeupdate', throttle(savePlayerTime, 1000));
