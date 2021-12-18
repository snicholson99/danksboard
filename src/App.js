import { useEffect } from 'react';
import useSound from 'use-sound';

import './App.css';
import sounds from './sounds.json';

const useKeyboardBindings = (map) => {
  useEffect(() => {
    const handlePress = (ev) => {
      const handler = map[ev.key];

      if (typeof handler === 'function') {
        handler();
      }
    };

    window.addEventListener('keydown', handlePress);

    return () => {
      window.removeEventListener('keydown', handlePress);
    };
  }, [map]);
};

const App = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const soundUrl = 'soundboard_sprite.mp3';
  const [play] = useSound(soundUrl, {
    sprite: {
      bang: [0, 750],
      fo_sho: [2300, 1100],
      left_hand: [4200, 900],
      niice: [6200, 980],
      ooooo: [8000, 2000],
      yeahh_cmon_dude: [10200, 1000],
    }
  });

  useKeyboardBindings({
    1: () => play({ id: 'bang' }),
    2: () => play({ id: 'fo_sho' }),
    3: () => play({ id: 'left_hand' }),
    4: () => play({ id: 'niice' }),
    5: () => play({ id: 'ooooo' }),
    6: () => play({ id: 'yeahh_cmon_dude' }),
  });

  return (
    <div className="App">
      <header>
        <img src="danks.png" alt="mr danks" />
        <div>
          <h1>DanksBoard™</h1>
          <p>A soundboard to inspire climbers through the soothing voice of Mr Danks.</p>
        </div>
      </header>
      <div id="soundcards">
        {sounds.map((sound, i) => (
          <div key={i} className="soundcard" aria-label={sound.id} onClick={() => play({ id: sound.id })}>
            <p>{sound.name}</p>
            {!isMobile && <small>Keyboard Binding: {i + 1}</small>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
