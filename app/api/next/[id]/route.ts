import fapi from "@/utils/api/fapi";
import { parseTitle } from "@/utils/api/function";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const args = {
      videoId: id,
      isAudioOnly: true,
      tunerSettingValue: "AUTOMIX_SETTING_NORMAL",
    };
    const _next = await fapi("next", args);
    const mqr =
      _next.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
        .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content
        .musicQueueRenderer;
    if (!mqr.content)
      return NextResponse.json(
        { status: 404, message: "Video not found" },
        { status: 404 },
      );

    const automix = mqr.content.playlistPanelRenderer.contents.find(
      (c: any) => c.automixPreviewVideoRenderer,
    ).automixPreviewVideoRenderer;
    const endpoint =
      automix.content.automixPlaylistVideoRenderer.navigationEndpoint
        .watchPlaylistEndpoint;

    const next = await fapi("next", { ...args, ...endpoint });
    const contents =
      next.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer.watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer.content.playlistPanelRenderer.contents.map(
        (c: any) => c.playlistPanelVideoRenderer,
      );
    const data = contents.map((c: any) => {
      const title = parseTitle(c.title.runs)[0];
      const subtitle = parseTitle(c.shortBylineText.runs)[0];
      let thumbnail = c.thumbnail.thumbnails.slice(-1)[0].url;
      thumbnail = thumbnail.match(/i\.ytimg\.com/)
        ? thumbnail.split("?")[0]
        : thumbnail.replace(/=w\d+-h\d+/, "=w512-h512");
      return { title, subtitle, thumbnail, videoId: c.videoId };
    });

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { status: 500, message: e?.message },
      { status: 500 },
    );
  }
};
