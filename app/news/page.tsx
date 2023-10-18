import React from "react";
import Article from "../components/Article";
import dummy_news from "../../dummy_news.json";
import { IArticle } from "../Interfaces";
import { Container, Stack } from "@mantine/core";

const News = () => {
  return (
    <Container px={0} mt={8} size="xs">
      <Stack gap={"sm"}>
        {dummy_news.map((n: IArticle) => (
          <Article key={n.link} {...n} />
        ))}
      </Stack>
    </Container>
  );
};

export default News;
