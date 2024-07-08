import fapi from "@/utils/api/fapi";
import { randomUUID } from "crypto";
import { createReadStream, createWriteStream, statSync } from "fs";
import { NextResponse } from "next/server";
import { format } from "path";
import { chooseFormat, getInfo as ytdlGetInfo } from "ytdl-core";

export const GET = async (
  _: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const args = {videoId: id, isAudioOnly: true, tunerSettingValue: 'AUTOMIX_SETTING_NORMAL'};
    const _next = await fapi('next', args);
    const mqr = _next.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer.watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer;
    if(!mqr.content) return NextResponse.json({ status: 404, message: 'Video not found' }, { status: 404 });
    
    const format = chooseFormat((await ytdlGetInfo(id)).formats, { quality: 'highestaudio' });
    const res = await fetch(format.url, { method: 'GET', cache: 'no-cache' });
    if(!res.ok) {
      return NextResponse.json({ status: 404, message: 'Video not found' }, { status: 404 });
    }
    return res;
  } catch(e: any) {
    return NextResponse.json({ status: 500, message: e?.message }, { status: 500 });
  }
};
