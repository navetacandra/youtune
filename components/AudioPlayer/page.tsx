"use client";
import { useEffect } from "react";

const setAudioSrc = () => {
  const audio = document.querySelector("audio#player") as HTMLAudioElement;
  const cursor = Number(sessionStorage.getItem("queue-cursor") || "0");
  const queue = JSON.parse(sessionStorage.getItem("queue") || "[]");
  if (queue[cursor]) {
    audio.setAttribute("src", `/api/player/${queue[cursor].videoId}`);
    audio.currentTime = 0;
    return true;
  } else return false;
};

export const unqueue = () => {
  const audio = document.querySelector("audio#player") as HTMLAudioElement;
  if (setAudioSrc()) audio.play();
};

const AudioPlayer = () => {
  useEffect(() => {
    const audio = document.querySelector("audio#player") as HTMLAudioElement;
    const intvl = setInterval(() => {
      // if(!audio.src) setAudioSrc();
      // else if(audio.ended) {
      //   const cursor = Number(sessionStorage.getItem('queue-cursor') || '0') + 1;
      //   sessionStorage.setItem('queue-cursor', cursor.toString());
      //   unqueue();
      // }
      if (audio.ended) {
        const cursor =
          Number(sessionStorage.getItem("queue-cursor") || "0") + 1;
        sessionStorage.setItem("queue-cursor", cursor.toString());
      }
      if (audio.ended || !audio.src) {
        unqueue();
      }
    }, 1000);
    () => clearInterval(intvl);
  }, []);
  return <audio id='player'></audio>;
};

export default AudioPlayer;
