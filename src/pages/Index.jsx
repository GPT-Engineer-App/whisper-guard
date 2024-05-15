import { useState } from "react";
import { Box, Button, Container, Input, Text, VStack, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaLock } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (input.trim() === "") {
      toast({
        title: "Message cannot be empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const encryptedMessage = encryptMessage(input);
    setMessages([...messages, { text: encryptedMessage, id: Date.now() }]);
    setInput("");
  };

  const encryptMessage = (message) => {
    // Simple encryption for demonstration purposes
    return btoa(message);
  };

  const decryptMessage = (encryptedMessage) => {
    return atob(encryptedMessage);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack spacing={2}>
          <FaLock />
          <Text fontSize="2xl">Anonymous Chat</Text>
        </HStack>
        <Box width="100%" height="60vh" overflowY="auto" border="1px" borderColor="gray.200" borderRadius="md" p={4}>
          {messages.map((message) => (
            <Box key={message.id} p={2} bg="gray.100" borderRadius="md" mb={2}>
              <Text>{decryptMessage(message.text)}</Text>
            </Box>
          ))}
        </Box>
        <HStack width="100%">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
          <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={handleSendMessage} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
