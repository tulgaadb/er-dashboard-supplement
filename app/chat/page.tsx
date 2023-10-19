import Image from "next/image";
import ChatComponent from "../components/chatComponent";

import React from "react";
import { Container } from "@mantine/core";

const Chat = () => {
  return (
    <Container px={0} mt={8} size="xs">
      <ChatComponent />
    </Container>
  );
};

export default Chat;
