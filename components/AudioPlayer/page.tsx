"use client";
import { useEffect } from "react";

const audio = new Audio();
function setAudioSrc() {
  const cursor = Number(sessionStorage.getItem("queue-cursor") || "0");
  const queue = JSON.parse(sessionStorage.getItem("queue") || "[]");
  if (queue[cursor]) {
    audio.setAttribute("src", `/api/player/${queue[cursor].videoId}`);
    audio.currentTime = 0;
    return true;
  } else return false;
}

export function unqueue() {
  if (setAudioSrc()) audio.play();
}

export default function AudioPlayer() {
  useEffect(() => {
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
}
