// Type definitions for Stellar wallet integrations

interface FreighterStatic {
  load: () => Promise<void>
  isConnected: () => Promise<boolean>
  getPublicKey: () => Promise<string>
  signTransaction: (xdr: string, network?: string) => Promise<string>
  authorize: () => Promise<boolean>
}

interface AlbedoPublicKeyResult {
  pubkey: string
  intent: string
  signature: string
}

interface AlbedoStatic {
  publicKey: (options: { title: string }) => Promise<AlbedoPublicKeyResult>
  signTransaction: (options: { xdr: string; network?: string; title?: string }) => Promise<any>
}

declare global {
  interface Window {
    freighter?: FreighterStatic
    albedo?: AlbedoStatic
  }
}

export {}
