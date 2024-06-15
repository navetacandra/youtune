"use client"

import Image from 'next/image'
import React, { Fragment, ReactNode } from 'react'
import Icon from './icon'
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


const items: { element: ReactNode }[] = [
    { element: <Icon to="/" normal={<HomeIcon/>} hover={<HomeFillIcon/>} /> },
    { element: <Icon to="/" normal={<SearchIcon/>} hover={<SearchFillIcon/>} /> },
    { element: <Icon to="/" normal={<CollectionIcon/>} hover={<CollectionFillIcon/>} /> },
    { element: <Icon to="/" normal={<Likeicon/>} hover={<LikeFillicon/>} /> },
    { element: <Icon to="/" normal={<PlaylistIcon/>} hover={<PlaylistFillIcon/>} /> },
]

const Sidebar = () => {
  return (
    <div className='fixed top-0 left-0 h-screen w-[90px] p-4 overflow-hidden bg-[#242b46] justify-center items-center text-center'>
      <div className='flex flex-col items-center'>
        <Image src={'/mainLogo.svg'} alt="logo" width={100} height={100} className='text-white items-center justify-center text-center mt-5'/>
        <div className='flex flex-col space-y-10 mt-20'>
            { items.map((item: { element: ReactNode }, i: number) => <Fragment key={i}>{item.element}</Fragment>) }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
