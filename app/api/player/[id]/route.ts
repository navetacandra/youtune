import fapi from "@/utils/api/fapi";
import { NextResponse } from "next/server";
import { chooseFormat, getInfo as ytdlGetInfo } from "ytdl-core";

export const GET = async (
  req: Request,
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

    const query = new URL(req.url).searchParams;
    const isStream = query.has("stream");
    const hasURL = query.has("url");
    const start = Number(query.get("start") || "0");
    const end = Number(query.get("end") || "0");

    if (
      isStream &&
      hasURL &&
      typeof start === "number" &&
      typeof end === "number" &&
      end > start
    ) {
      const streamRes = await fetch(query.get("url") || "", {
        method: "GET",
        cache: "no-cache",
        headers: { Range: `bytes=${start}-${end}` },
      });
      return streamRes;
    }

    let format,
      meta,
      res,
      chunks,
      ok = false;
    while (!ok) {
      format = chooseFormat((await ytdlGetInfo(id)).formats, {
        quality: "highestaudio",
      });
      meta = {
        duration: Number(format?.approxDurationMs) / 1000,
        size: Number(format?.contentLength),
        url: format?.url,
      };
      res = await fetch(format.url, { method: "GET", cache: "no-cache" });
      ok = res.ok;
      if (ok) {
        chunks = [];
        const size = Math.ceil((meta.size / meta.duration) * 5);
        for (let total = 0; total < meta.size; ) {
          let next = total + size;
          if (next > meta.size) next = meta.size;
          chunks.push({
            start: total,
            end: next,
            req_url: `/api/player/${id}?stream&start=${total}&end=${next}&url=${encodeURIComponent(format.url)}`,
          });
          total = next + 1;
        }
      }
    }
    return NextResponse.json({ meta, chunks }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { status: 500, message: e?.message },
      { status: 500 },
    );
  }
};
