import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import micBtn from "../Assests/mic.png";
import resetBtn from "../Assests/reset.png";
import ctb from "../Assests/ctb.png";
import ctbDone from "../Assests/ctbDone.png";
import Summary from "./Summary";

export default function SpeechArea() {
  const [mic, setMic] = useState(false);
  const [listening, setListening] = useState(true);
  const [copy, setCopy] = useState(true);

  const handleClick = () => {
    setMic(!mic);
    setListening(!listening);
  };
  const bgColorClass = mic ? "bg-red-400" : "bg-white";

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const text = transcript;
  const handleListening = listening
    ? startListening
    : SpeechRecognition.stopListening;

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleClear = () => {
    resetTranscript();
  };

  const handleCopy = () => {
    var copyText = document.getElementById("content");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    setCopy(!copy);
  };
  return (
    <>
      <div className="mx-auto  w-3/4 md:w-[60%] bg-gray-100 rounded-md shadow-md p-4">
        <div className="mb-5 flex justify-between">
          <button className="" onClick={handleClear}>
            <img src={resetBtn} alt="resetkey" className="w-7 h-7" />
          </button>
          <button className=" rounded-md p-1" onClick={handleCopy}>
            <img
              className="w-7 h-7"
              src={copy ? ctb : ctbDone}
              alt="clipboard"
            />
          </button>
        </div>

        <div className="text-gray-700 h-[7rem]">
          <textarea
            className="form-control w-full bg-gray-100 resize-none focus:outline-none caret-transparent"
            id="content"
            type="text"
            rows="8"
            value={text}
          ></textarea>
        </div>

        <div className="text-center mt-14">
          <button
            onClick={() => {
              handleClick();
              handleListening();
            }}
            className={`${bgColorClass} rounded-full p-1`}
          >
            <img src={micBtn} alt="mickey" className="w-16 h-16" />
          </button>
        </div>
      </div>
      <Summary text={text} />
    </>
  );
}


