import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json(
    { status: 400, message: "Keyword is required" },
    { status: 400 },
  );
};
