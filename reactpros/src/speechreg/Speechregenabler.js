import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "./Speechreg"; // Corrected import path

const Speechregenabler = () => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    isMicrophoneAvailable,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition({
    commands: [
      {
        command: "reset",
        callback: () => resetTranscript(),
      },
      {
        command: "hello",
        callback: () => console.log("Hello there!"),
      },
    ],
  });

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div>
      <h1>Speech Recognition Component</h1>
      <p>{listening ? "Listening..." : "Click to start listening"}</p>
      <button onClick={SpeechRecognition.startListening}>Start Listening</button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset Transcript</button>
      <h2>Live Transcript:</h2>
      <p>{transcript}</p>
      <h2>Interim Transcript:</h2>
      <p>{interimTranscript}</p>
      <h2>Final Transcript:</h2>
      <p>{finalTranscript}</p>
      <p>Microphone Available: {isMicrophoneAvailable ? "Yes" : "No"}</p>
      <p>
        Supports Continuous Listening:{" "}
        {browserSupportsContinuousListening ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default Speechregenabler;
