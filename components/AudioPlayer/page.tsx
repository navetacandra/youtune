"use client";
import { Track, chunksToURL } from "@/utils/functions";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import NextIcon from "@/assets/next.svg";
import PlayIcon from "@/assets/play.svg";
import PauseIcon from "@/assets/stop.svg";

let [track, setTrack] = [null, null] as [
  Track | null,
  Dispatch<SetStateAction<Track | null>> | null,
];

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

const setAudioSrc = async (
  abortSignal?: AbortSignal,
): Promise<Track | null> => {
  try {
    if (abortSignal?.aborted) throw new Error("Request aborted");

    const audio = document.querySelector("audio#player") as HTMLAudioElement;
    const cursor = Number(sessionStorage.getItem("queue-cursor") || "0");
    const queue = JSON.parse(sessionStorage.getItem("queue") || "[]");

    if (queue[cursor]) {
      const response = await fetch(`/api/player/${queue[cursor].videoId}`, {
        signal: abortSignal,
      });
      if (!response.ok) throw new Error("Failed to fetch audio data");

      const { chunks, meta } = await response.json();
      const url = await chunksToURL(chunks, abortSignal);
      if (abortSignal?.aborted) throw new Error("Request aborted");

      audio.setAttribute("src", url);
      document.querySelector("#duration")!.innerHTML = formatTime(
        meta.duration,
      );
      document.querySelector("#time")!.innerHTML = formatTime(0);
      return queue[cursor];
    }
    return null;
  } catch (error: any) {
    if (error.name !== "AbortError") console.error(error);
    return null;
  }
};

export const unqueue = async (abortSignal?: AbortSignal) => {
  try {
    if (abortSignal?.aborted) throw new Error("Request aborted");

    const set = await setAudioSrc(abortSignal);
    const audio = document.querySelector("audio#player") as HTMLAudioElement;
    if (audio.src && set != null) {
      setTrack?.(set);
      audio.play();
    }
  } catch (error: any) {
    if (error.name !== "AbortError") console.error(error);
  }
};

const AudioPlayer = ({
  hasTrack,
}: {
  hasTrack: Dispatch<SetStateAction<boolean>>;
}) => {
  [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const initialized = useRef<boolean>(false);
  const abortSignal = useRef<AbortController>(new AbortController());

  const playAndStop = (play?: boolean) => {
    const audio = document.querySelector("audio#player") as HTMLAudioElement;
    if (play) {
      audio.play();
      setIsPlaying(true);
      return;
    } else if (play === false) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const reset = () => {
    (document.querySelector("audio#player") as HTMLAudioElement).pause();
    (document.querySelector("#duration") as HTMLSpanElement).innerText =
      "--:--";
    (document.querySelector("#time") as HTMLSpanElement).innerText = "--:--";
    (document.querySelector("#timetrack") as HTMLInputElement).value = "0";
    (
      document.querySelector("#timetrack-progress") as HTMLDivElement
    ).style.width = `0%`;
    playAndStop(false);
    abortSignal.current.abort();
    abortSignal.current = new AbortController();
  };

  const prevTrack = () => {
    const cursor = Number(sessionStorage.getItem("queue-cursor") || "0") - 1;
    sessionStorage.setItem("queue-cursor", cursor.toString());
    reset();
    unqueue(abortSignal.current.signal);
  };

  const skipTrack = () => {
    const cursor = Number(sessionStorage.getItem("queue-cursor") || "0") + 1;
    sessionStorage.setItem("queue-cursor", cursor.toString());
    reset();
    unqueue(abortSignal.current.signal);
  };

  const trackSkip = () => {
    const audio = document.querySelector("audio#player") as HTMLAudioElement;
    const progress = (document.querySelector("#timetrack") as HTMLInputElement)
      .value;
    audio.currentTime = audio.duration * (Number(progress) / 100);
  };

  useEffect(() => {
    const audio = document.querySelector("audio#player") as HTMLAudioElement;

    const endedHandler = () => {
      const cursor = Number(sessionStorage.getItem("queue-cursor") || "0") + 1;
      sessionStorage.setItem("queue-cursor", cursor.toString());
      reset();
      unqueue(abortSignal.current.signal);
    };

    const trackRun = () => {
      (document.querySelector("#timetrack") as HTMLInputElement).value =
        `${Math.round((audio.currentTime / audio.duration) * 100)}`;
      (
        document.querySelector("#timetrack-progress") as HTMLDivElement
      ).style.width =
        `${Math.round((audio.currentTime / audio.duration) * 100) + 0.5}%`;
      (document.querySelector("#time") as HTMLSpanElement).innerText =
        formatTime(audio.currentTime);
    };

    const init = async () => {
      if (!audio.src && !initialized.current) {
        const track = await setAudioSrc();
        if (track != null) setTrack?.(track);
      }
    };

    audio.addEventListener("timeupdate", trackRun);
    audio.addEventListener("ended", endedHandler);
    init();
    return () => {
      audio.removeEventListener("timeupdate", trackRun);
      audio.removeEventListener("ended", endedHandler);
    };
  }, []);

  useEffect(() => {
    hasTrack(track != null);
  }, [track]);

  return (
    <>
      <audio id='player' />
      <div
        className={
          "md:pl-28 md:pr-8 px-2 py-2 h-16 md:h-18 w-full justify-between" +
          (track ? " flex" : " hidden")
        }
      >
        <div className='flex jusify-start items-center w-[700%] md:w-2/6'>
          <img
            alt='thumbnail'
            src={track?.thumbnail || ""}
            width={56}
            height={56}
            className='bg-zinc-700 rounded-full'
            onClick={() => playAndStop()}
          />
          <div className='flex flex-col text-start ml-3'>
            <p className='text-sm text-balance font-bold line-clamp-2'>
              {track?.title.text || ""}
            </p>
            <p className='text-xs text-balance font-semibold text-zinc-300 line-clamp-1'>
              {track?.subtitle.text || ""}
            </p>
          </div>
        </div>
        <div className='w-1/2 md:px-8 px-0 flex md:flex flex-col items-start justify-center'>
          <div className='w-full h-3/4 flex justify-center items-center'>
            <NextIcon
              className='w-5 h-5 rotate-180 cursor-pointer md:block hidden'
              onClick={prevTrack}
            />
            <div
              className='w-9 h-9 rounded-full bg-white md:mx-4 mx-0 my-4 md:p-1 pl-0 cursor-pointer flex '
              onClick={() => playAndStop()}
            >
              {isPlaying ? (
                <PauseIcon className='mx-auto my-auto hover:scale-110 transition-all' />
              ) : (
                <PlayIcon className='mx-auto my-auto hover:scale-110 transition-all text-white' />
              )}
            </div>
            <NextIcon
              className='w-5 h-5 cursor-pointer md:block hidden'
              onClick={skipTrack}
            />
          </div>
          <div className='w-full justify-center items-center md:flex hidden'>
            <span className='text-xs' id='time'>
              --:--
            </span>
            <div className='w-3/4 mx-4'>
              <div className='h-1 w-full relative'>
                <div className='w-full h-full bg-white/15 absolute md:top-0 bottom-0 left-0 rounded-lg'></div>
                <div
                  id='timetrack-progress'
                  className='w-full h-full bg-white absolute top-0 left-0 rounded-lg'
                  style={{ width: "0" }}
                ></div>
                <input
                  type='range'
                  id='timetrack'
                  onInput={trackSkip}
                  className='absolute top-0 left-0 rounded-xl appearance-none bg-transparent h-full w-full'
                  defaultValue={0}
                  min={0}
                  max={100}
                />
              </div>
            </div>
            <span className='text-xs' id='duration'>
              --:--
            </span>
          </div>
        </div>
        <div className='flex jusify-start items-center w-1/2 md:w-2/6'></div>
      </div>
    </>
  );
};

export default AudioPlayer;
