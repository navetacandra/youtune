"use client";
import { chunksToURL } from "@/utils/functions";
import { useEffect } from "react";

const setAudioSrc = async () => {
  const audio = document.querySelector("audio#player") as HTMLAudioElement;
  const cursor = Number(sessionStorage.getItem("queue-cursor") || "0");
  const queue = JSON.parse(sessionStorage.getItem("queue") || "[]");
  if (queue[cursor]) {
    const { chunks } = await (
      await fetch(`/api/player/${queue[cursor].videoId}`)
    ).json();
    const url = await chunksToURL(chunks);
    audio.setAttribute("src", url);
    audio.currentTime = 0;
    return true;
  } else return false;
};

export const unqueue = async () => {
  const audio = document.querySelector("audio#player") as HTMLAudioElement;
  if (await setAudioSrc()) audio.play();
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
