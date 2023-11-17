import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { JSDOM } from "jsdom";

interface pageData {
  alt: string;
  articleUrl: string;
  id: number;
  imgUrl: string;
  showTime: number;
  summary: string;
  title: string;
}

interface sxcoalData {
  title: string;
  link: string;
  date: string;
  categories: string;
  source: string;
  summary: string;
}

interface combinedNews {
  title: string;
  date: string;
  summary: string;
  link: string;
  source: string;
}

function parseHtmlToObjects(html: string) {
  const dom = new JSDOM(html);

  const articles = dom.window.document.querySelectorAll(".artnr");
  const result: any = [];

  articles.forEach((article: any) => {
    const titleLink = article.querySelector("h4 > a");

    const title = article
      .querySelector("h4 [target='_blank']")
      .textContent.trim();

    const date = article.querySelector(".spandate").textContent.trim();
    const categories = article.querySelectorAll(".p1 > span:not(.spandate)");
    const source = categories[categories.length - 1].textContent.trim();
    const categoryList = Array.from(categories)
      .slice(0, -1)
      .map((span: any) => span.textContent.trim())
      .join(", ");
    const summary = article.querySelector(".p2").textContent.trim();

    result.push({
      title,
      link: titleLink.href,
      date,
      categories: categoryList,
      source,
      summary,
    });
  });

  return result;
}

export async function GET(request: Request) {
  const url =
    "https://www.mysteel.net/english/article/queryMarketInsightsByPage";

  const coalData = {
    channelId: 6945,
    startDate: "2023-10-30",
    pageNum: 1,
    pageSize: 5,
    breedCode: "010301",
  };
  const coal = await axios.post(url, coalData);
  const coalResponse = coal?.data?.data?.pageData || [];

  const cokeData = {
    channelId: 6945,
    startDate: "2023-10-30",
    pageNum: 1,
    pageSize: 5,
    breedCode: "010302",
  };
  const coke = await axios.post(url, cokeData);
  const cokeResponse = coke?.data?.data?.pageData || [];

  const sxcolaUlr = "https://www.sxcoal.com/news/cat-ajax?page=1&lang=en";
  const sxcoalData = "cat=0&industry=77%2C71%2C70%2C&bel=6%2C";
  const sxcoal = await axios.post(sxcolaUlr, sxcoalData, {
    headers: {
      "x-requested-with": "XMLHttpRequest",
    },
  });
  const sxcoalResponse = sxcoal?.data?.list || "";

  const sxcoalParsed = parseHtmlToObjects(sxcoalResponse).map(
    (sxcl: sxcoalData) => {
      return {
        title: sxcl.title,
        date: sxcl.date.substring(0, 10),
        summary: sxcl.summary,
        link: sxcl.link,
        source: sxcl.source,
      };
    }
  );

  const sxcoalNews = sxcoalParsed.slice(0, 4);

  const news = coalResponse.concat(cokeResponse)?.map((n: pageData) => {
    return {
      title: n.title,
      date: new Date(n.showTime).toISOString().substring(0, 10),
      summary: n.summary,
      link: "https://www.mysteel.net" + n.articleUrl,
      source: "https://www.mysteel.net",
    };
  });

  const combinedNews = sxcoalNews
    .concat(news)
    .sort((a: combinedNews, b: combinedNews) => {
      return (
        (new Date(b.date) as unknown as number) -
        (new Date(a.date) as unknown as number)
      );
    });
  // console.log("🚀 ~ file: route.ts:108 ~ GET ~ news:", combinedNews);

  return NextResponse.json({
    message: "Success",
    success: true,
    data: combinedNews,
  });
}
