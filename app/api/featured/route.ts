import { NextResponse } from "next/server";
import { parseTitle } from "@/utils/api/function";
import fapi from "@/utils/api/fapi";

export type TextComponentDetail = { text: string; type?: string; id?: string };
export type ContentDetail = {
  id: string;
  type: string;
  thumbnail: string;
  title: TextComponentDetail;
  subtitle: TextComponentDetail[];
};
export type Content = { category: string; contents: ContentDetail[] };

export async function GET() {
  try {
    const res = await fapi("browse", { browseId: "FEmusic_home" });
    const contents: Content[] =
      res.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents
        .filter((c: { [k: string]: boolean }) => c.musicCarouselShelfRenderer)
        .map((_c: any) => {
          const c: any = _c.musicCarouselShelfRenderer;
          const category: string =
            c.header.musicCarouselShelfBasicHeaderRenderer.title.runs[0].text;
          const contents = c.contents
            .map((item: any) => {
              if (item.musicResponsiveListItemRenderer) {
                const mrlir: any = item.musicResponsiveListItemRenderer;
                const fc: TextComponentDetail[] = mrlir.flexColumns
                    .map(
                      (f: any) =>
                        f.musicResponsiveListItemFlexColumnRenderer.text.runs,
                    )
                    .filter((f: boolean) => f)
                    .map((f: any) => parseTitle(f))
                    .flat(),
                  title: TextComponentDetail = fc[0],
                  subtitle: TextComponentDetail[] = fc.slice(1),
                  _thumbnail: string =
                    mrlir.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.slice(
                      -1,
                    )[0].url,
                  thumbnail: string = _thumbnail.match(
                    /https:\/\/i\.ytimg\.com/i,
                  )
                    ? _thumbnail
                    : _thumbnail.replace(/=w\d+-h\d+/, "=w512-h512");
                return {
                  id: title.id,
                  type: title.type,
                  thumbnail,
                  title,
                  subtitle,
                };
              }

              if (item.musicTwoRowItemRenderer) {
                const mtrir: any = item.musicTwoRowItemRenderer,
                  title: TextComponentDetail = parseTitle(
                    mtrir.title.runs.filter((f: boolean) => f),
                  )[0],
                  subtitle: TextComponentDetail[] = parseTitle(
                    mtrir.subtitle.runs.filter((f: boolean) => f),
                  ),
                  _thumbnail: string =
                    mtrir.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails.slice(
                      -1,
                    )[0].url,
                  thumbnail: string = _thumbnail.match(
                    /https:\/\/i\.ytimg\.com/i,
                  )
                    ? _thumbnail
                    : _thumbnail.replace(/=w\d+-h\d+/, "=w512-h512");
                return {
                  id: title.id,
                  type: title.type,
                  thumbnail,
                  title,
                  subtitle,
                };
              }
              return null;
            })
            .filter((f: boolean) => f);
          return { category, contents };
        });

    return NextResponse.json(contents);
  } catch (err: any) {
    return NextResponse.json(
      { status: 500, message: err.toString() },
      { status: 500 },
    );
  }
}
