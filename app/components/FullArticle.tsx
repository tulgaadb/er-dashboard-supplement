"use client";
import {
  Anchor,
  Blockquote,
  Card,
  Center,
  Container,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import parse from "html-react-parser";
import Iframe from "react-iframe";

function FullArticle({
  title,
  summary,
  date,
  content,
  link,
  source,
}: {
  title: string;
  summary: string;
  date: string;
  content: string;
  link: string;
  source: string;
}) {
  return (
    <Container w={"70%"}>
      <Card shadow="sm" m="md" className="flex items-center justify-center ">
        <Text fw={500} size="lg" mt="md">
          {title}
        </Text>
        <Anchor href={link}>To see source page please click here</Anchor>
        {summary !== "" && (
          <Blockquote color="blue" mt="xl">
            {summary}
          </Blockquote>
        )}
        <Text mt="xs" c="dimmed" size="sm">
          {date}
        </Text>
        {parse(content)}
      </Card>
    </Container>
  );
}
export default FullArticle;
