import type {RefObject} from 'react'
import {useLayoutEffect} from 'react'

/**
 * Keeps RSuite Calendar accessible names aligned with visible text (WCAG 2.5.3).
 * See `RsCalendar` for upstream issue details and the RSuite major-upgrade re-check note.
 *
 * ponytail: DOM MutationObserver workaround; remove when RsCalendar documents that RSuite
 * Calendar passes axe `label-content-name-mismatch` without this patch.
 * @param rootRef the calendar wrapper element.
 */
export function useRsuiteCalendarLabelInName(rootRef: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const ensure = (el: Element, visible: string): void => {
      if (!visible) {
        return
      }
      const current = el.getAttribute('aria-label')?.trim() ?? ''
      // Prefix check (not includes): axe rejects digit "1" as present inside zero-padded "01 …".
      if (current === visible || current.startsWith(`${visible},`) || current.startsWith(`${visible} `)) {
        return
      }
      el.setAttribute('aria-label', current ? `${visible}, ${current}` : visible)
    }

    const sync = (scope: ParentNode): void => {
      scope.querySelectorAll('.rs-calendar-header-title').forEach(el => {
        ensure(el, el.textContent?.replace(/\s+/g, ' ').trim() ?? '')
      })
      scope.querySelectorAll('.rs-calendar-table-cell').forEach(el => {
        ensure(el, el.querySelector('.rs-calendar-table-cell-day')?.textContent?.trim() ?? '')
      })
    }

    const scope = root.querySelector('.rs-calendar') ?? root
    const options: MutationObserverInit = {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label'],
    }
    const observer = new MutationObserver(() => {
      // Disconnect while we write so our aria-label updates do not re-enter.
      observer.disconnect()
      sync(scope)
      observer.observe(scope, options)
    })

    sync(scope)
    observer.observe(scope, options)
    return () => observer.disconnect()
  }, [rootRef])
}
