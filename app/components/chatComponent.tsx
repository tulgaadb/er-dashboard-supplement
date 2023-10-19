"use client";
import { useChat, Message } from "ai/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
  Textarea,
  Button,
  Divider,
  Flex,
  Paper,
} from "@mantine/core";
import classes from "./ArticleCard.module.css";

export default function ChatComponent() {
  // Vercel AI SDK (ai package) useChat()
  // useChat -> handles messages for us, user input, handling user submits, etc.
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();
  // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds]

  console.log("messages", messages);
  console.log("input", input);

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        {messages.map((message: Message) => {
          return (
            <div key={message.id}>
              {/* Formatting the message */}

              <Paper radius="sm" p={4} m={4}>
                <div>
                  {message.role === "assistant" ? (
                    <Text size="sm" fw={600}>
                      GPT-4
                    </Text>
                  ) : (
                    <Text size="sm" fw={600}>
                      User
                    </Text>
                  )}
                </div>

                <Text size="xs" pt={8}>
                  {message.content}
                </Text>
              </Paper>
            </div>
          );
        })}
        <Divider />
      </Card.Section>

      <form className="mt-12" onSubmit={handleSubmit}>
        <Group pt="sm">
          <Textarea
            placeholder="Send a message"
            value={input}
            size="sm"
            w={"75%"}
            onChange={handleInputChange}
          />

          <button>Send</button>
        </Group>
      </form>
    </Card>
  );
}
