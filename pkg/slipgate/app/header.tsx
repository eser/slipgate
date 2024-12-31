import React from "react";
import { Flex, Link, DropdownMenu, Avatar } from "@radix-ui/themes";
import Image from "next/image";
import { auth } from "@/lib/auth.ts";
import { sections } from "@/lib/sections";

export async function Header() {
  const session = await auth.getSession();

  return (
    <Flex wrap="wrap" align="center" justify="between" className="w-full" asChild>
      <header className="p-8 gap-6 ~text-xs/base">
        <Flex align="center" gap="6">
          <Link
            href="/"
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          >
            <Image
              aria-hidden
              src="/assets/file-text.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Home
          </Link>
          {sections.map((section) => (
            <Link
              key={section.slug}
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href={`/sections/${section.slug}`}
            >
              <Image
                aria-hidden
                src="/assets/file-text.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              {section.name}
            </Link>
          ))}
        </Flex>

        <Flex align="center" gap="6">
          {session?.user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  size="2"
                  src={session.user.picture}
                  fallback="?"
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Link 
                    className="flex items-center gap-2 w-full"
                    href="/settings"
                  >
                    User Settings
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <Link 
                    className="flex items-center gap-2 w-full"
                    href="/auth/logout"
                  >
                    Logout
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="/auth"
            >
              <Image
                aria-hidden
                src="/assets/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Login
            </Link>
          )}
        </Flex>
      </header>
    </Flex>
  );
}
