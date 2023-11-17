import React from "react";
import { IArticle } from "../Interfaces";
import classes from "./ArticleCardVertical.module.css";

import { Card, Image, Text, Group } from "@mantine/core";
import { combinedNews } from "../news/page";
import Link from "next/link";

const Article = ({
  date,
  link,
  source,
  summary,
  title,
  path,
  content,
}: combinedNews) => {
  return (
    <Card withBorder radius="md">
      <Link
        href={path!}
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
      </Link>
    </Card>
  );
};

export default Article;
