import React from "react";
import { IArticle } from "../Interfaces";
import classes from "./ArticleCardVertical.module.css";

import { Card, Image, Text, Group } from "@mantine/core";

const Article = ({
  thumbnail,
  title,
  content,
  date,
  link,
  website,
}: IArticle) => {
  return (
    <Card withBorder radius="md">
      <a
        href={link}
        target="_blank"
        style={{ all: "unset", cursor: "pointer" }}
      >
        <Group wrap="nowrap" gap={"sm"}>
          <Image
            src={thumbnail}
            alt={thumbnail}
            w={"20vh"}
            h={"20vh"}
            style={{ aspectRatio: "1/1", objectFit: "cover" }}
          />
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
              {content}
            </Text>
            <Group wrap="nowrap" gap="xs">
              <Group gap="xs" wrap="nowrap">
                <Text size="xs">{website}</Text>
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
