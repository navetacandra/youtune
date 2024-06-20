"use client";

import { Fragment } from "react";
import { Content, ContentDetail } from "@/app/api/featured/route";
import useSWR from "swr";
import Image from "next/image";
import Search from "@/components/Search";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error, isLoading } = useSWR("/api/featured", fetcher);

  if (error) return <p>Erorrrr</p>;
  if (isLoading) return <p>loadingggg</p>;

  return (
    <>
      <Search />
      {data.map((d: Content, i: number) => (
        <Fragment key={i}>
          <h1>{d.category}</h1>
          {d.contents.map((c: ContentDetail, j: number) => (
            <Fragment key={j}>
              <Image
                src={c.thumbnail}
                alt={c.title.text}
                width={300}
                height={250}
                className='mt-20'
              />
              <h2>{`${c.title.text}`}</h2>
              <p>{`${c.subtitle[0].text}`}</p>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default Home;
