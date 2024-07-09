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
    const handler = async () => {
      const cursor = Number(sessionStorage.getItem("queue-cursor") || "0") + 1;
      sessionStorage.setItem("queue-cursor", cursor.toString());
      await unqueue();
    };
    audio.addEventListener("ended", handler);
    if (!audio.src) setAudioSrc();
    return () => audio.removeEventListener("ended", handler);
  }, []);
  return <audio id='player' controls></audio>;
};

export default AudioPlayer;
