import { useEffect } from 'react';
import { Howl } from 'howler';

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
  
  const sound = new Howl({
    src: ['soundboard_sprite.mp3'],
    sprite: {
      bang: [0, 750],
      fo_sho: [2300, 1100],
      left_hand: [4200, 900],
      niice: [6200, 980],
      ooooo: [8000, 2000],
      yeahh_cmon_dude: [10200, 1000],
    }
  });

  // TODO: Get this working from sounds.json
  // useKeyboardBindings(sounds.map(sound => {
  //   sound.keyboardBinding: () => sound.play(sound.id)
  // }));

  useKeyboardBindings({
    1: () => sound.play('bang'),
    2: () => sound.play('fo_sho'),
    3: () => sound.play('left_hand'),
    4: () => sound.play('niice'),
    5: () => sound.play('ooooo'),
    6: () => sound.play('yeahh_cmon_dude'),
  });

  const onSoundcardClick = (soundId) => {
    sound.play(soundId);
  }

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
          <button key={i} className="soundcard" aria-label={sound.id} onClick={() => onSoundcardClick(sound.id)}>
            <p>{sound.name}</p>
            {!isMobile && <small>Keyboard Binding: {sound.keyboardBinding}</small>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
