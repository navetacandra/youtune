"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from "react";
import SearchIcon from "@/assets/search_dark.svg";

const Search = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const init = useRef<boolean>(false);
  const query = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const pathname = usePathname();
  const q = pathname.match(/\/search\/(.*)\/?/);
  const p = q ? q[1] : "";

  useEffect(() => {
    if ((query.current?.value.length || 0) > 0) setShow(true);
    else setShow(false);
  }, [pathname]);

  useEffect(() => {
    if (!init.current) init.current = true;
    if (show) query.current?.focus();
  }, [show]);

  useEffect(() => {
    const keyHandler = (key: any) => {
      if (key.keyCode == 27 || key.which == 27) setShow(false);
    };
    const wkeyHandler = (key: any) => {
      if (key.ctrlKey && key.keyCode == 191) setShow(true);
    };
    query.current?.addEventListener("keydown", keyHandler);
    window.addEventListener("keydown", wkeyHandler);
    return () => {
      query.current?.removeEventListener("keydown", keyHandler);
      window.removeEventListener("keydown", wkeyHandler);
    };
  }, []);

  const handleSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    query.current?.blur();
    const searchQuery = query.current?.value.trim();

    if (!(!searchQuery || searchQuery.length < 2)) {
      router.push(`/search/${encodeURI(searchQuery || "")}`, undefined);
    }
  };

  return (
    <div
      className={
        "fixed shadow-2xl w-10 h-10 transition-all rounded-full p-4 bg-white/40 backdrop-blur-sm justify-end items-center search-input " +
        (init.current ? `${show ? "flex" : "hide"}` : "hidden")
      }
    >
      <form onSubmit={handleSearch} className='w-full'>
        <input
          type='text'
          ref={query}
          defaultValue={decodeURIComponent(p)}
          className='w-full text-black py-1 bg-transparent text-base text-black focus:outline-none active:outline-none'
        ></input>
      </form>
      <div
        className='w-8 h-8 flex justify-center items-center pl-4 cursor-pointer'
        onClick={() => handleSearch()}
      >
        <i className='block'>
          <SearchIcon />
        </i>
      </div>
    </div>
  );
};

export default Search;
