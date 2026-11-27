declare module 'vitest/browser' {
  interface VitestBrowserUserEvent {
    hover: (element: Element) => Promise<void>
    unhover: (element: Element) => Promise<void>
    click: (element: Element) => Promise<void>
    keyboard: (key: string) => Promise<void>
  }

  export const userEvent: VitestBrowserUserEvent
  export const cdp: () => Promise<{
    send: (command: string, params: Record<string, unknown>) => Promise<void>
  }>
}
