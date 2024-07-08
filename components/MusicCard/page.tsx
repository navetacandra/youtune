import React from "react";
import Image from "next/image";

export default function MusicCard({ thumbnail, title, subtitle }: {thumbnail: string, title: string, subtitle: string}) {
  return (
    <div className='transition-all'>
      <Image
        src={thumbnail}
        alt={title}
        width={300}
        height={250}
        className='mt-10 md:w-[180px] md:min-h-[180px] h-[100px] w-[100px] object-cover rounded-lg cursor-pointer'
      />
      <h2 className='md:text-md text-sm font-semibold font-poppins max-w-[150px] line-clamp-2 mt-2 cursor-pointer'>{`${title}`}</h2>
      <p className='md:text-sm text-xs md:font-normal font-thin font-poppins max-w-[150px] cursor-pointer'>{`${subtitle}`}</p>
    </div>
  )
}
