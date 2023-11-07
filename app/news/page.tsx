import React from "react";
import Article from "../components/Article";
import dummy_news from "../../dummy_news.json";
import { IArticle } from "../Interfaces";
import { Container, Stack } from "@mantine/core";
import { JSDOM } from "jsdom";
import { mySteel, sxcoalNews } from "../helper/news";

export interface combinedNews {
  title: string;
  date: string;
  summary: string;
  link: string;
  source: string;
}

async function getData() {
  const mysteel = await mySteel();
  const sxcoal = await sxcoalNews();

  return sxcoal.concat(mysteel).sort((a: combinedNews, b: combinedNews) => {
    return (
      (new Date(b.date) as unknown as number) -
      (new Date(a.date) as unknown as number)
    );
  });
}

const News = async () => {
  const data = await getData();
  if (data === undefined) {
    return <></>;
  }
  return (
    <Container px={0} mt={8} size="xs">
      <Stack gap={"sm"}>
        {data.map((n: combinedNews) => (
          <Article key={n?.link} {...n} />
        ))}
      </Stack>
    </Container>
  );
};

export default News;
