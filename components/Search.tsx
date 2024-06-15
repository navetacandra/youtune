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
    router.push(`/search/${encodeURI(query.current?.value.trim() || " ")}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type='text'
        ref={query}
        defaultValue={p}
        className='text-black'
      ></input>
    </form>
  );
};

export default Search;
