"use client";
import React, { Fragment, ReactNode } from "react";
import Icon from "@/components/Sidebar/icon";
import HomeIcon from "@/assets/home.svg";
import HomeFillIcon from "@/assets/home_fill.svg";
import SearchIcon from "@/assets/search.svg";
import SearchFillIcon from "@/assets/search_fill.svg";
import CollectionIcon from "@/assets/collection.svg";
import CollectionFillIcon from "@/assets/collection_fill.svg";
import Likeicon from "@/assets/like.svg";
import LikeFillicon from "@/assets/like_fill.svg";
import PlaylistIcon from "@/assets/playlist.svg";
import PlaylistFillIcon from "@/assets/playlist_fill.svg";
import AudioPlayer from "../AudioPlayer/page";

const items: { element: ReactNode }[] = [
  { element: <Icon to='/' normal={<HomeIcon />} hover={<HomeFillIcon />} /> },
  {
    element: <Icon to='/' normal={<SearchIcon />} hover={<SearchFillIcon />} />,
  },
  { element: <Icon to='/' normal={<Likeicon />} hover={<LikeFillicon />} /> },
  {
    element: (
      <Icon to='/' normal={<CollectionIcon />} hover={<CollectionFillIcon />} />
    ),
  },
  {
    element: (
      <Icon to='/' normal={<PlaylistIcon />} hover={<PlaylistFillIcon />} />
    ),
  },
];

const Bottombar = () => {
  return (
    <>
      <div className='fixed left-0 bottom-0 z-9 w-screen min-h-16 p-1 overflow-hidden bg-[#242b46] rounded-t-xl custom-shadow justify-center items-center text-center inline-block'>
        <AudioPlayer />
        <div className='flex items-center md:hidden'>
          <div className='flex flex-row gap-10 justify-around pt-3 items-center mx-auto'>
            {items.map((item: { element: ReactNode }, i: number) => (
              <Fragment key={i}>{item.element}</Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bottombar;
