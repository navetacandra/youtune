import fapi from "@/utils/api/fapi";
import { StreamingFormat } from "@/utils/functions";
import { NextResponse } from "next/server";
import { getInfo } from "@distube/ytdl-core";
// import { HttpsProxyAgent } from "https-proxy-agent";
("https-proxy-agent");
import { default as nFetch } from "node-fetch";

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
      try {
        // const agent = new HttpsProxyAgent("http://152.26.229.66:9443");
        const streamRes = await nFetch(query.get("url") || "", {
          // agent,
          method: "GET",
          headers: { Range: `bytes=${start}-${end}` },
        });
        return new Response(Buffer.from(await streamRes.arrayBuffer()));
      } catch (e: any) {
        return NextResponse.json(
          { status: 500, message: e?.message },
          { status: 500 },
        );
      }
    }

    // const agent = createProxyAgent({ uri: "http://152.26.229.66:9443" });
    const _info = await getInfo(`https://www.youtube.com/watch?v=${id}`, {
      // agent,
    });
    const format = _info.formats.filter(
      (f) => !!f.hasAudio,
    )[0] as StreamingFormat;
    const meta = {
      duration: Number(format.approxDurationMs) / 1000,
      size: Number(format.contentLength),
      url: format.url,
    };
    const chunks = [];
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
    return NextResponse.json({ meta, chunks }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { status: 500, message: e?.message },
      { status: 500 },
    );
  }
};
