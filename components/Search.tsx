"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const Search = () => {
  const query = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const pathname = usePathname();
  const q = pathname.match(/\/search\/(.*)\/?/);
  const p = q ? q[1] : "";

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchQuery = query.current?.value.trim();

    if (!(!searchQuery || searchQuery.length < 2)) {
      router.push(`/search/${encodeURI(searchQuery || "")}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className='md:inline-block hidden'>
      <input
        type='text'
        ref={query}
        defaultValue={decodeURIComponent(p)}
        className='text-black'
      ></input>
    </form>
  );
};

export default Search;
