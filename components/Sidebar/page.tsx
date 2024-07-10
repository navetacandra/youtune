"use client";
import Image from "next/image";
import { Fragment, ReactNode, useState } from "react";
import Icon from "./icon";
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
import Navbar from "../Navbar/page";
import Bottombar from "../Bottombar/page";
import Search from "../Search";

const items: { element: ReactNode; name?: string }[] = [
  { element: <Icon to='/' normal={<HomeIcon />} hover={<HomeFillIcon />} /> },
  {
    name: "Search",
    element: <Icon to='/' normal={<SearchIcon />} hover={<SearchFillIcon />} />,
  },
  {
    element: (
      <Icon to='/' normal={<CollectionIcon />} hover={<CollectionFillIcon />} />
    ),
  },
  { element: <Icon to='/' normal={<Likeicon />} hover={<LikeFillicon />} /> },
  {
    element: (
      <Icon to='/' normal={<PlaylistIcon />} hover={<PlaylistFillIcon />} />
    ),
  },
];

const Sidebar = () => {
  const [searchShow, setSearchShow] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <Search show={searchShow} setShow={setSearchShow} />
      <div className='fixed top-0 left-0 z-10 sidebar-shadow h-screen w-[90px] p-4 overflow-hidden bg-[#242b46] rounded-none shadow-none justify-center items-center text-center md:inline-block hidden'>
        <div className='flex flex-col items-center '>
          <Image
            id='logo'
            src={"/mainLogo.svg"}
            alt='logo'
            width={100}
            height={100}
            className='text-white items-center justify-center text-center h-24 w-24 md:inline-block hidden'
          />
          <div className='flex flex-col gap-10 justify-center mt-14 pb-8 pt-2 items-center mx-auto'>
            {items.map(
              (item: { element: ReactNode; name?: string }, i: number) => (
                <>
                  {item.name == "Search" ? (
                    <div key={i} onClick={() => setSearchShow(!searchShow)}>
                      {item.element}
                    </div>
                  ) : (
                    <Fragment key={i}>{item.element}</Fragment>
                  )}
                </>
              ),
            )}
          </div>
        </div>
      </div>
      <Bottombar show={searchShow} setShow={setSearchShow} />
    </>
  );
};

export default Sidebar;
