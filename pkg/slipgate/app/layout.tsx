import React from "react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Bree_Serif, Roboto, Roboto_Mono } from "next/font/google";

import { Box, Flex, Theme, ThemePanel } from "@radix-ui/themes";
import "./globals.css";

import { Header } from "./header.tsx";

const fontHeading = Bree_Serif({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const fontSans = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const fontMono = Roboto_Mono({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Slipgate",
  description: "Playground app for JavaScript and Golang interoperability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body>
        <Theme
          accentColor="orange"
          grayColor="slate"
          radius="medium"
          scaling="110%"
          asChild
        >
          <Flex direction="column">
            <Box asChild>
              <Header />
            </Box>
            <Box asChild>
              {children}
            </Box>
            <ThemePanel defaultOpen={false} />
          </Flex>
        </Theme>
      </body>
    </html>
  );
}
