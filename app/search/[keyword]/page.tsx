"use client";

import { Fragment } from "react";
import { Content, ContentDetail } from "@/app/api/featured/route";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Page = ({ params: { keyword } }: { params: { keyword: string } }) => {
  const { data, error, isLoading } = useSWR(
    `/api/search/${decodeURI(keyword)}`,
    fetcher,
  );

  if (error) return <p>Erorrrr</p>;
  if (isLoading) return <p>loadingggg</p>;

  return (
    <>
      {data.results?.map((d: Content, i: number) => (
        <Fragment key={i}>
          <h1>{d.category}</h1>
          <div className='mb-20'>
            {d.contents.map((c: ContentDetail, j: number) => (
              <Fragment key={j}>
                <Image
                  src={c.thumbnail}
                  alt='...'
                  width={300}
                  height={250}
                  className='mt-5'
                />
                <h2>{`${c.title.text}`}</h2>
              </Fragment>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Page;
