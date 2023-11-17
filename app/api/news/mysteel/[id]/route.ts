import { NextResponse } from "next/server";

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
    var myHeaders = new Headers();

    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const user = await fetch(
      "https://www.mysteel.net/english/login/signin?username=Doljinsuren.t%40mmc.mn&password=X6T-H5P-g1W",
      requestOptions
    );

    const userHeader = user.headers.get("set-cookie");

    const articleHeaders = new Headers();
    articleHeaders.append("Cookie", userHeader!);

    const articleResponse = await fetch(
      "https://www.mysteel.net/english/article/findById?articleId=5044774",
      { method: "GET", headers: articleHeaders, redirect: "follow" }
    );
    const article = (await articleResponse.json()) as MySteelNews;
    const { content, title, summary, showTime } = article.data;

    const regex = /<p>.*?<\/p>/gs;
    const paragraph = content
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
        summary,
        date: new Date(showTime).toISOString().substring(0, 10),
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
