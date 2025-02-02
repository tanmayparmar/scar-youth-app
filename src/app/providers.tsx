import { NextUIProvider } from '@nextui-org/react'
import { ApolloWrapper } from './lib/apolloWrapper'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ApolloWrapper>
  )
}