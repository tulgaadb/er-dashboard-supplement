import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  //   const messages = await request // { messages: [] }

  return NextResponse.json({
    message: "Success",
    success: true,
  });
}
