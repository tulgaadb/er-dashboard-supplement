import { NextResponse } from "next/server";
import { sxcoalNews } from "../../../../helper/news";
import { combinedNews } from "../../../../news/page";

type MySteelNews = {
  data: {
    articleUrl: string;
    content: string;
    imgUrl: string;
    showTime: number;
    summary: string;
    title: string;
  };
};

export async function GET(request: Request) {
  try {
    const { url } = request;
    const val = url.split("/sxcoal/");
    if (val.length !== 2) {
      return NextResponse.json({
        message: "ERROR",
        success: false,
        data: {},
      });
    }
    const id = val[1];

    const sxcoal = (await sxcoalNews()) as combinedNews[];
    const article = sxcoal.find((s) => s.id === id);
    if (article === undefined) {
      return NextResponse.json({
        message: "ERROR",
        success: false,
      });
    }

    const { title, date, content, link } = article;

    console.log("🚀 ~ file: route.ts:41 ~ GET ~ replaced:", article);
    return NextResponse.json({
      message: "Success",
      success: true,
      data: {
        title,
        summary: "",
        date,
        content: content,
        link,
        source: "sxcoal",
      },
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:49 ~ GET ~ error:", error);
    return NextResponse.json({
      message: "ERROR",
      success: false,
    });
  }
}
