import React, { useEffect, useState } from "react";
import "./App.css";
import { AudioClip } from "./types";
import Drum from "./Drum";
import { LiaFreeCodeCamp } from "react-icons/lia";

const audioClips: AudioClip[] = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick n' Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed HH",
  },
];

function App() {
  const [isChecked, setIsChecked] = useState(true); // Default to on
  const [currentDescription, setCurrentDescription] = useState("");
  const [volume, setVolume] = useState(50); // Volume state

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const playAudio = (key: string, description: string) => {
    if (!isChecked) return; // Don't play if switch is off

    const audioElement = document.getElementById(key) as HTMLAudioElement;
    if (audioElement) {
      setCurrentDescription(description);
      audioElement.volume = volume / 100; // Set volume
      audioElement.currentTime = 0;
      audioElement.play().catch((error) => {
        console.error(`Error playing audio: ${error}`);
      });
    } else {
      console.error(`Audio element with id ${key} not found`);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!isChecked) return; // Don't play if switch is off

    const key = event.key.toUpperCase();
    const clip = audioClips.find((clip) => clip.keyTrigger === key);
    if (clip) {
      playAudio(key, clip.description);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isChecked]);

  return (
    <>
      <main
        id="drum-machine"
        className="flex justify-center items-center w-full h-full min-h-screen bg-[#8d8d8d]"
      >
        <div
          id="display"
          className="flex relative flex-col md:flex-row m-4 justify-between border-4 border-[#ffa500] gap-4 w-[660px] bg-[#b3b3b3] p-10"
        >
          <div className="w-full">
            <div className="whole-drum h-full grid grid-rows-3 grid-flow-col gap-4 ">
              {audioClips.map((clip) => (
                <Drum
                  audioClip={clip}
                  playAudio={playAudio}
                  key={clip.keyTrigger}
                  isChecked={isChecked}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-2 mb-4">
              <h1 className="text-center font-bold">Power</h1>
              <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <span
                  className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                    isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                  }`}
                >
                  <span
                    className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                      isChecked ? "translate-x-[28px]" : ""
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            <div className="p-4 w-full mt-2 text-center bg-[#808080] font-bold">
              <span>{currentDescription}</span>
            </div>
            <div className="mt-4 w-full flex flex-col items-center">
              <label htmlFor="volume" className="mb-2">
                Volume: {volume}
              </label>
              <input
                id="volume"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 absolute right-3 top-2 italic font-black text-lg">
            FCC <LiaFreeCodeCamp size={25}/>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
