import { NextResponse } from "next/server";
import { getFeatured } from "KarsaVibes";

export type ContentDetail = {
  musicId: string;
  type?: string;
  thumbnail: string;
  title: string;
  subtitle: string;
};
export type Content = { category: string; contents: ContentDetail[] };

export const GET = async () => {
  try {
    return NextResponse.json([
      {
        category: "Quick picks",
        contents: (await getFeatured()) as ContentDetail[],
      },
    ] as Content[]);
  } catch (err: any) {
    return NextResponse.json(
      { status: 500, message: err.toString() },
      { status: 500 },
    );
  }
};
