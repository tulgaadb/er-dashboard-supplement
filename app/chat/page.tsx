import Image from "next/image";
import ChatComponent from "../components/chatComponent";

import React from "react";
import { Container } from "@mantine/core";

const Chat = () => {
  return (
    <Container px={0} mt={8} size="xs">
      <h2 className="text-2xl">GPT-4 Streaming Chat Application</h2>
      <ChatComponent />
    </Container>
  );
};

export default Chat;
