"use client";

import { Fragment } from "react";
import { Content, ContentDetail } from "@/app/api/featured/route";
import Search from "@/components/Search";
import MusicCard from "@/components/MusicCard/page";
import useSWRImmutable from "swr/immutable";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Home = () => {
  const { data, error, isLoading } = useSWRImmutable("/api/featured", fetcher);
  if (error) return <p>Erorrrr</p>;
  if (isLoading) return <p>loadingggg</p>;

  return (
    <>
      <Search />
      {data.map((d: Content, i: number) => (
        <Fragment key={i}>
          <h1 className='md:text-3xl text-2xl font-poppins font-bold'>
            {d.category}
          </h1>
          <div className='grid md:grid-cols-6 grid-cols-4 gap-4 mb-20 2xl:grid-cols-8'>
            {d.contents.map((c: ContentDetail, j: number) => (
              <MusicCard
                key={j}
                id={c.id}
                thumbnail={c.thumbnail}
                title={c.title.text}
                subtitle={c.subtitle[0].text}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Home;
