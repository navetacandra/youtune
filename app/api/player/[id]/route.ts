import fapi from "@/utils/api/fapi";
import { StreamingFormat } from "@/utils/functions";
import { NextResponse } from "next/server";

const getFormats = async (videoId: string): Promise<StreamingFormat[]> => {
  const apiKey = "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc";
  const headers = {
    "X-YouTube-Client-Name": "5",
    "X-YouTube-Client-Version": "19.09.3",
    Origin: "https://www.youtube.com",
    "User-Agent":
      "com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)",
    "content-type": "application/json",
  };

  const b = {
    context: {
      client: {
        clientName: "IOS",
        clientVersion: "19.09.3",
        deviceModel: "iPhone14,3",
        userAgent:
          "com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)",
        hl: "en",
        timeZone: "UTC",
        utcOffsetMinutes: 0,
      },
    },
    videoId,
    playbackContext: {
      contentPlaybackContext: { html5Preference: "HTML5_PREF_WANTS" },
    },
    contentCheckOk: true,
    racyCheckOk: true,
  };

  const res = await fetch(
    `https://www.youtube.com/youtubei/v1/player?key${apiKey}&prettyPrint=false`,
    { method: "POST", body: JSON.stringify(b), headers },
  );
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  return json.streamingData.adaptiveFormats as StreamingFormat[];
};

const chooseFormat = (formats: StreamingFormat[]) => {
  const level: { [key: string]: number } = {
    AUDIO_QUALITY_HIGH: 1,
    AUDIO_QUALITY_MEDIUM: 2,
    AUDIO_QUALITY_LOW: 3,
    "": 4,
  };
  return formats.sort(
    (a, b) => level[a.audioQuality || ""] - level[b.audioQuality || ""],
  )[0];
};

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
      format = chooseFormat(await getFormats(id));
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
