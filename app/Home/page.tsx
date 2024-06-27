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

  console.log(data);

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
              <Fragment key={j}>
                <div className='transition-all'>
                  <Image
                    src={c.thumbnail}
                    alt={c.title.text}
                    width={300}
                    height={250}
                    className='mt-10 md:w-[180px] md:min-h-[180px] h-[100px] w-[100px] object-cover rounded-lg'
                  />
                  <h2 className='md:text-md text-sm font-semibold font-poppins max-w-[150px] line-clamp-2 mt-2'>{`${c.title.text}`}</h2>
                  <p className='md:text-sm text-xs md:font-normal font-thin font-poppins max-w-[150px]'>{`${c.subtitle[0].text}`}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Home;
