import { NextResponse } from "next/server";
import { Content, ContentDetail } from "../../featured/route";
import { getSearchResult } from "KarsaVibes";

export const GET = async (
  _: Request,
  { params: { keyword } }: { params: { keyword: string } },
) => {
  try {
    return NextResponse.json({
      keyword,
      results: [
        {
          category: `Result for "${keyword}"`,
          contents: (await getSearchResult(keyword)) as ContentDetail[],
        },
      ] as Content[],
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { status: 500, message: err.toString() },
      { status: 500 },
    );
  }
};
