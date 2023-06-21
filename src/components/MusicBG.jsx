import React from 'react';

function MusicBG() {
  return (
    <div className="fixed bottom-0 right-0">
      <audio src="/src/assets/BGaudio.mp3" controls loop />
    </div>
  );
}

export default MusicBG;
