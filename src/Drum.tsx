import React from "react";
import { AudioClip } from "./types";

interface DrumProps {
  audioClip: AudioClip;
  playAudio: (key: string, description: string) => void;
  isChecked: boolean;
}

const Drum: React.FC<DrumProps> = ({ audioClip, playAudio, isChecked }) => {
  return (
    <button
      className={`flex justify-center items-center drum-pad bg-[#808080] rounded-sm font-bold  ${
        !isChecked
          ? "cursor-not-allowed opacity-50 flex justify-center items-center bg-[#808080] rounded-sm font-bold"
          : ""
      }`}
      id={`drum-${audioClip.keyTrigger}`}
      onClick={() =>
        isChecked && playAudio(audioClip.keyTrigger, audioClip.description)
      }
    >
      {audioClip.keyTrigger}
      <audio
        id={audioClip.keyTrigger}
        className="clip"
        src={audioClip.url}
      ></audio>
    </button>
  );
};

export default Drum;
