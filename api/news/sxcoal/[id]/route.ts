import { NextResponse } from "next/server";
import { sxcoalNews } from "../../../../app/helper/news";
import { combinedNews } from "../../../../app/news/page";

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
    const sxcoal = (await sxcoalNews()) as combinedNews[];
    const article = sxcoal.find((s) => s.id === "1725083590985367553");
    if (article === undefined) {
      return NextResponse.json({
        message: "ERROR",
        success: true,
      });
    }

    const { title, date, content } = article;
    const regex = /<p>.*?<\/p>/gs;
    const paragraph = content!
      .match(regex)
      ?.map((c: string) => {
        return c.replace(/<[^>]*>/g, "");
      })
      .filter((string) => string.trim() !== "");
    return NextResponse.json({
      message: "Success",
      success: true,
      data: {
        title,
        summary: "",
        date,
        paragraph,
      },
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:49 ~ GET ~ error:", error);
    return NextResponse.json({
      message: "ERROR",
      success: true,
    });
  }
}
