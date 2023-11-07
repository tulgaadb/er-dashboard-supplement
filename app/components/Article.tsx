import React from "react";
import { IArticle } from "../Interfaces";
import classes from "./ArticleCardVertical.module.css";

import { Card, Image, Text, Group } from "@mantine/core";
import { combinedNews } from "../news/page";

const Article = ({ date, link, source, summary, title }: combinedNews) => {
  return (
    <Card withBorder radius="md">
      <a
        href={link}
        target="_blank"
        style={{ all: "unset", cursor: "pointer" }}
      >
        <Group wrap="nowrap" gap={"sm"}>
          <div className={classes.body}>
            <Text className={classes.title} mt="xs" mb="md">
              {title}
            </Text>
            <Text
              fz="sm"
              c="dimmed"
              lineClamp={3}
              style={{
                WebkitLineClamp: 3,
                display: "-webkit-box",
                WebkitBoxOrien: "vertical",
              }}
            >
              {summary}
            </Text>
            <Group wrap="nowrap" gap="xs">
              <Group gap="xs" wrap="nowrap">
                <Text size="xs">{source}</Text>
              </Group>
              <Text size="xs" c="dimmed">
                •
              </Text>
              <Text size="xs" c="dimmed">
                {date}
              </Text>
            </Group>
          </div>
        </Group>
      </a>
    </Card>
  );
};

export default Article;
