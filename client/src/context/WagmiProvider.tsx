"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider as Provider } from 'wagmi'
import { config } from '@/services/wagmi/config'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

export default function WagmiProvider({children}:{children:ReactNode}) {
  return (
    <Provider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}