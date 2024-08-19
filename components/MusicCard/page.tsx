"use client";
import React from "react";
import { unqueue } from "../AudioPlayer/page";

const MusicCard = ({
  id,
  thumbnail,
  title,
  subtitle,
}: {
  id: string;
  thumbnail: string;
  title: string;
  subtitle: string;
}) => {
  const setMedia = async () => {
    const audio = document.querySelector("audio#player") as HTMLAudioElement;
    const queue = await (await fetch(`/api/next/${id}`)).json();
    if (queue) {
      audio.pause();
      sessionStorage.setItem("queue", JSON.stringify(queue));
      sessionStorage.setItem("queue-cursor", "0");
      unqueue();
    }
  };

  return (
    <div className='transition-all'>
      <img
        src={thumbnail}
        alt={title}
        width={300}
        height={250}
        className='mt-10 md:w-[180px] md:min-h-[180px] h-[100px] w-[100px] object-cover rounded-lg cursor-pointer'
        onClick={setMedia}
      />
      <h2 className='md:text-md text-sm font-semibold font-poppins max-w-[150px] line-clamp-2 mt-2 cursor-pointer'>{`${title}`}</h2>
      <p className='md:text-sm text-xs md:font-normal font-thin font-poppins max-w-[150px] cursor-pointer'>{`${subtitle}`}</p>
    </div>
  );
};

export default MusicCard;
