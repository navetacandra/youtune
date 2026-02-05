import { NextResponse } from "next/server";
import { getInfo, getAudioFile } from "KarsaVibes";

export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const meta = await getInfo(id);
    const url = await getAudioFile(id);
    return NextResponse.json({ meta, url }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { status: 500, message: e?.message },
      { status: 500 },
    );
  }
};
