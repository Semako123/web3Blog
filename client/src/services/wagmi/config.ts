import { http, createConfig } from '@wagmi/core'
import { sepolia, hardhat } from '@wagmi/core/chains'
import { injected } from '@wagmi/connectors'


export const config = createConfig({
  chains: [hardhat],
  connectors: [injected()],
  transports: { 
    [hardhat.id]: http(),
  },
  ssr: true, 
})