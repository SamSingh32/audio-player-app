// src/App.js
import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const audioFiles = [
  { id: 1, name: 'Piano', url: '/path/to/piano.mp3' },
  { id: 2, name: 'Drums', url: '/path/to/drums.mp3' },
  { id: 3, name: 'Guitar', url: '/path/to/guitar.mp3' },
  { id: 4, name: 'Trumpet', url: '/path/to/trumpet.mp3' },
];

function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const audioRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const newTrack = {
      id: Date.now(),
      name: acceptedFiles[0].name,
      url: URL.createObjectURL(acceptedFiles[0]),
    };

    setTracks([...tracks, newTrack]);
  };

  const playAudio = () => {
    if (selectedTrack) {
      audioRef.current.src = selectedTrack.url;
      audioRef.current.play();
    }
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="App">
      <div>
        <p className="page_header__kVzhN">Audio Pill Player</p>
        <div className="TrackSelector_container__pm_iE">
          {[...audioFiles, ...tracks].map((track) => (
            <button
              key={track.id}
              className={`TrackSelector_trackButton__arDBC ${
                selectedTrack && selectedTrack.id === track.id ? 'selected' : ''
              }`}
              onClick={() => setSelectedTrack(track)}
            >
              {track.name}
            </button>
          ))}
        </div>
      </div>

      <div className="TimelineControls_container__dIU_K">
        <p>Time: 00:00 / 30:00</p>
        <button onClick={playAudio}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button onClick={stopAudio}>
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>

      <div className="Timeline_timelineContainer__IvRqC">
        <audio ref={audioRef}></audio>
      </div>

      <div className="Dropzone_container">
        <Dropzone onDrop={onDrop} />
      </div>
    </div>
  );
}

function Dropzone({ onDrop }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="Dropzone">
      <input {...getInputProps()} />
      <p>Drag & drop audio files here, or click to select files</p>
    </div>
  );
}

export default App;
