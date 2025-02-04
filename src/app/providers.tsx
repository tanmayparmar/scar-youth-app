import { HeroUIProvider } from "@heroui/react"
import { ApolloWrapper } from './lib/apolloWrapper'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </ApolloWrapper>
  )
}