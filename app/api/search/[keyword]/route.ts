import { parseTitle } from "@/utils/api/function";
import search from "@/utils/api/search";
import { NextResponse } from "next/server";
import { Content, ContentDetail, TextComponentDetail } from "../../featured/route";

export async function GET(_: Request, { params: { keyword } }: { params: { keyword: string } }) {
  try {
    const res = await search(keyword);
    const content = res.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents;
    
    const headContent: ContentDetail[] = content.filter((c: { [k: string]: boolean }) => c.musicCardShelfRenderer).map((c: { [k: string]: any }) => {
      const mcsr: any = c.musicCardShelfRenderer,
      title: TextComponentDetail = parseTitle(mcsr.title.runs)[0],
      subtitle: TextComponentDetail[] = parseTitle(mcsr.subtitle.runs),
      _thumbnail: string = mcsr.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.slice(-1)[0].url,
      thumbnail: string = _thumbnail.match(/https:\/\/i\.ytimg\.com/i) ? _thumbnail : _thumbnail.replace(/=w\d+-h\d+/, '=w512-h512');
      return { id: title?.id, type: title?.type, thumbnail, title, subtitle };
    });

    const _mcontents: Content = {
      category: '',
      contents: [
        ...headContent,
        content.find((c: { [k: string]: boolean }) => c.musicCardShelfRenderer).musicCardShelfRenderer.contents
        .filter((c: { [k: string]: boolean }) => c.musicResponsiveListItemRenderer)
        .map((c: {[k: string]: any}) => {
          const mrlir = c.musicResponsiveListItemRenderer,
          fc: TextComponentDetail[] = mrlir.flexColumns
            .map((f: any) => f.musicResponsiveListItemFlexColumnRenderer.text.runs)
            .filter((f: boolean) => f)
            .map((f: any) => parseTitle(f))
            .flat(),
          title: TextComponentDetail = fc[0],
          subtitle: TextComponentDetail[] = fc.slice(1),
          _thumbnail: string = mrlir.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.slice(-1)[0].url,
          thumbnail: string = _thumbnail.match(/https:\/\/i\.ytimg\.com/i) ? _thumbnail : _thumbnail.replace(/=w\d+-h\d+/, '=w512-h512');

          return { id: title?.id, type: title?.type, thumbnail, title, subtitle };
        })
      ].filter((f: { [k: string]: boolean }) => f.id)
    };

    const _contents: Content[] = content.filter((c: { [k: string]: boolean }) => !c.musicCardShelfRenderer)
    .map((c: { [k: string]: any }) => {
      const msr = c.musicShelfRenderer,
      category: string = msr.title.runs[0].text,
      contents = msr.contents.map((c: { [k: string]: any }) => {
        const mrlir = c.musicResponsiveListItemRenderer,
        fc: TextComponentDetail[] = mrlir.flexColumns
          .map((f: any) => f.musicResponsiveListItemFlexColumnRenderer.text.runs)
          .filter((f: boolean) => f)
          .map((f: any) => parseTitle(f))
          .flat(),
        title: TextComponentDetail = fc[0],
        subtitle: TextComponentDetail[] = fc.slice(1),
        _thumbnail: string = mrlir.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.slice(-1)[0].url,
        thumbnail: string = _thumbnail.match(/https:\/\/i\.ytimg\.com/i) ? _thumbnail : _thumbnail.replace(/=w\d+-h\d+/, '=w512-h512');
        
        return { id: title.id, type: title.type, thumbnail, title, subtitle };
      });

      return { category, contents };
    });

    const results: Content[] = [_mcontents, ..._contents];
    return NextResponse.json({ keyword, results });
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ status: 500, message: err.toString() }, { status: 500 });
  }
}
