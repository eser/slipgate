import React from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex flexGrow="1" align="center" justify="center" asChild>
      <main>
        <Box className="~max-w-xs/4xl p-4">
          <Flex direction="column" gap="4">
            <Heading as="h1" className="~text-lg/4xl">
              Welcome to Slipgate 🔑
            </Heading>
            <Text as="p" className="~text-sm/xl text-center">
              Please pick a section
            </Text>
          </Flex>
        </Box>
      </main>
    </Flex>
  );
}
