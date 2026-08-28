import {act} from '@testing-library/react'

/**
 * Forcibly dispatches synthetic `load` events on all `<link rel="stylesheet">` elements in the DOM.
 *
 * @remarks
 * jsdom (used in test environments) does not fully emulate external stylesheet loading -
 * the native `load` event on `<link>` elements may never fire. This function works around
 * that limitation by manually invoking any registered `onload` handlers with a fake `Event`.
 *
 * The 5-iteration loop with `setTimeout(..., 0)` is necessary to catch stylesheets that are
 * injected asynchronously (e.g. by lazy-loaded components or runtime CSS-in-JS libraries
 * like styled-components).
 *
 * @example
 * ```ts
 * // After rendering a component that loads CSS asynchronously
 * render(<LazyComponent />);
 * await flushPendingLinkLoads();
 * // Assertions that depend on applied styles can now run safely
 * ```
 */
export const flushPendingLinkLoads = async () => {
  for (let i = 0; i < 5; i++) {
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
      document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach((link) => {
        link.onload?.(new Event('load'))
      })
    })
  }
}
