import { JSDOM } from "jsdom";

interface sxcoalData {
  title: string;
  link: string;
  date: string;
  categories: string;
  source: string;
  summary: string;
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
  var myHeaders = new Headers();
  myHeaders.append("authority", "www.sxcoal.com");
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-US,en;q=0.9");
  myHeaders.append(
    "content-type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  myHeaders.append(
    "cookie",
    "PHPSESSID=kdg0kh8abk0jsud2mvpaom99a3; _csrf=30fa250bd835cd2a1e2aa2d70d0353f480ec9c4a72e3d0dfebfb842bc9470485a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22ouAq_f8Wh_O9l6chNo_OCW87tXQBlh2b%22%3B%7D; ApplicationGatewayAffinity=b870528a4f2131627cfcb0f6cdc0282383b206a592eff273715dfea7a2c1ed17; ApplicationGatewayAffinityCORS=b870528a4f2131627cfcb0f6cdc0282383b206a592eff273715dfea7a2c1ed17"
  );
  myHeaders.append("origin", "https://www.sxcoal.com");
  myHeaders.append("referer", "https://www.sxcoal.com/news/index/en");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"macOS"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-origin");
  myHeaders.append("sec-gpc", "1");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
  );
  myHeaders.append(
    "x-csrf-token",
    "N1F3RElYdUtYJDY1Fj5NHF8OOH0lbhYjeT4oCwoPTXxDCSYGJTBHKQ=="
  );
  myHeaders.append("x-requested-with", "XMLHttpRequest");

  var raw = "cat=0&industry=77%2C74%2C71%2C70%2C&bel=6%2C";

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "https://www.sxcoal.com/news/cat-ajax?page=1&lang=en",
    requestOptions
  );

  const coalResponse = await response.json();

  const sxcoalParsed = parseHtmlToObjects(coalResponse?.list).map(
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
  return sxcoalParsed;
}
