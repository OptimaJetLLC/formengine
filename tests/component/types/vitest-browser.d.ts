declare module 'vitest/browser' {
  export const cdp: () => Promise<{
    send: (command: string, params: Record<string, unknown>) => Promise<void>
  }>
}
