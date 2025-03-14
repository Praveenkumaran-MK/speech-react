// src/components/SpeechComponent.js
import React, { useState } from 'react';
import useSpeechSynthesis from './speech';

const SpeechComponent = () => {
  const { speak, cancel, pause, resume, speaking, voices, supported } = useSpeechSynthesis();
  const [text, setText] = useState('');

  if (!supported) {
    return <p>Your browser does not support speech synthesis.</p>;
  }

  const handleSpeak = () => {
    speak({ text });
  };

  return (
    <div>
      <h1>Speech Synthesis</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSpeak} disabled={speaking}>Speak</button>
      <button onClick={pause} disabled={!speaking}>Pause</button>
      <button onClick={resume} disabled={speaking}>Resume</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
};

export default SpeechComponent;