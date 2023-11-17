import { JSDOM } from "jsdom";

const fs = require("fs");

export interface sxcoalRecordData {
  id: string;
  type: number;
  typeName: string;
  title: string;
  summary: string;
  content: string;
  showTime: string;
  browsePermission: number;
  newsForcePictureList: never[];
  weekStr: string;
}

interface SXCoalResponse {
  code: number;
  message: string;
  timestamp: string;
  data: {
    records: sxcoalRecordData[];
    total: number;
    size: number;
    current: number;
    pages: number;
    statisticsHeader: null;
  };
}
interface pageData {
  alt: string;
  articleUrl: string;
  id: number;
  imgUrl: string;
  showTime: number;
  summary: string;
  title: string;
}

export async function mySteel() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json, text/plain, */*");
  myHeaders.append("Accept-Language", "en-US,en;q=0.5");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    "buriedDistinctId=c6bbc07ad3f64e8abac4a8111aa7d52c; i18n_redirected=en; BURIED_STARTUP=eyJTVEFSVFVQIjp0cnVlLCJTVEFSVFVQVElNRSI6IjIwMjMtMTAtMzEgMTQ6MjI6MDUuMjcyIn0%3D; BURIED_COMMON_SPM=116.mysteel_net.market_list.0.0.1698736481405"
  );
  myHeaders.append("Origin", "https://mysteel.net");
  myHeaders.append("Referer", "https://mysteel.net/");
  myHeaders.append("Sec-Fetch-Dest", "empty");
  myHeaders.append("Sec-Fetch-Mode", "cors");
  myHeaders.append("Sec-Fetch-Site", "same-site");
  myHeaders.append("Sec-GPC", "1");
  myHeaders.append(
    "User-Agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
  );
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"macOS"');

  let raw = JSON.stringify({
    channelId: 6945,
    startDate: "2023-05-30",
    pageNum: 1,
    pageSize: 5,
    breedCode: "010301",
  });

  let requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    cache: "no-store",
  };

  const coal = await fetch(
    "https://www.mysteel.net/english/article/queryMarketInsightsByPage",
    requestOptions
  );
  const coalResponse = await coal.json();

  raw = JSON.stringify({
    channelId: 6945,
    startDate: "2023-05-30",
    pageNum: 1,
    pageSize: 5,
    breedCode: "010302",
  });

  requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    cache: "no-store",
  };

  const coke = await fetch(
    "https://www.mysteel.net/english/article/queryMarketInsightsByPage",
    requestOptions
  );

  const cokeResponse = await coke.json();

  const news = (coalResponse.data.pageData || [])
    .concat(cokeResponse.data.pageData || [])
    ?.map((n: pageData) => {
      return {
        title: n.title,
        date: new Date(n.showTime).toISOString().substring(0, 10),
        summary: n.summary,
        link: "https://www.mysteel.net" + n.articleUrl,
        source: "https://www.mysteel.net",
        path: `/news/mysteel/${n.id}`,
        id: n.id,
      };
    });

  return news;
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
export async function sxcoalNews() {
  const coalResponse = await fetch(
    "https://www.sxcoal.com/api/coalresource-journalism/news/LatestNewsPage",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.8",
        "cache-control": "max-age=0",
        "content-type": "application/json",
        lang: "en_US",
        responsetype: "blob",
        "sec-ch-ua":
          '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",

        Referer: "https://www.sxcoal.com/en/news",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: '{"content":"","pageNum":1,"pageSize":20,"labelId":["11006","51070","51071","51074","51077"]}',
      method: "POST",
    }
  );
  const regex = /<p>.*?<\/p>/gs;

  const coal = (await coalResponse.json()) as SXCoalResponse;
  const { data } = coal;
  const { records } = data;

  const sxcoalParsed = records.map((sxcl: sxcoalRecordData) => {
    let modifiedSummary = sxcl.summary;
    if (sxcl.summary.match(regex)) {
      modifiedSummary = sxcl.summary
        .match(regex)
        ?.map((c: string) => {
          return c.replace(/<[^>]*>/g, "");
        })
        .join()
        .toString()!;
    }

    return {
      title: sxcl.title,
      date: sxcl.showTime.substring(0, 10),
      summary: modifiedSummary,
      link: "https://www.sxcoal.com/en/news/detail/" + sxcl.id,
      source: "https://www.sxcoal.com",
      path: `/news/sxcoal/${sxcl.id}`,
      content: sxcl.content,
      id: sxcl.id,
    };
  });
  return sxcoalParsed;
}
