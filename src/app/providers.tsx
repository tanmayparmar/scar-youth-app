"use client";

import { HeroUIProvider } from "@heroui/react"
import { ApolloWrapper } from './lib/apolloWrapper'
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <HeroUIProvider>
        <NextThemesProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </ApolloWrapper>
  )
}