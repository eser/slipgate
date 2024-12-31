import React from "react";
import { redirect } from "next/navigation";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { auth } from "@/lib/auth.ts";

async function handleSignIn() {
  "use server";

  const url = auth.getSignInUrl();
  redirect(url);
}

export default function AuthPage() {
  return (
    <Flex flexGrow="1" align="center" justify="center" asChild>
      <main>
        <Box className="~max-w-xs/4xl p-4">
          <Flex direction="column" gap="4" align="center">
            <Heading as="h1" className="~text-lg/4xl">
              Welcome to Slipgate 🔑
            </Heading>
            <Text as="p" className="~text-sm/xl text-center">
              Please sign in to continue
            </Text>
            <form action={handleSignIn}>
              <Button
                className="mt-4"
                size="3"
                type="submit"
              >
                Sign in with Google
              </Button>
            </form>
          </Flex>
        </Box>
      </main>
    </Flex>
  );
}
