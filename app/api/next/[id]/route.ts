import { NextResponse } from "next/server";
import { getAutomixQueue } from "KarsaVibes";

export const GET = async (
  _: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    return NextResponse.json(await getAutomixQueue(id));
  } catch (e: any) {
    return NextResponse.json(
      { status: 500, message: e?.message },
      { status: 500 },
    );
  }
};
