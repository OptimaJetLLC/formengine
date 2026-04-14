import {useCallback, useMemo, useState} from 'react'
import {DesignerOnly} from './DesignerOnly'
import MyDesignerApp from './MyDesignerApp'
import {ViewerOnly} from './ViewerOnly'
import {ViewerRsuiteImportCss} from './ViewerRsuiteImportCss'
import {ViewerRsuiteLoadCss} from './ViewerRsuiteLoadCss'

type CurrentView = 'all-components' | 'designer-only' | 'viewer-only' | 'viewer-rsuite-import' | 'viewer-rsuite-load'

const VIEW_STORAGE_KEY = 'my-designer-view'

const DEFAULT_VIEW: CurrentView = 'viewer-only'

const VALID_VIEWS: readonly CurrentView[] = [
  'all-components',
  'designer-only',
  'viewer-only',
  'viewer-rsuite-import',
  'viewer-rsuite-load',
]

/**
 * Reads the persisted sample view from localStorage (same pattern as `ViewPicker` + `usePersistentView`).
 */
function readStoredView(): CurrentView {
  if (typeof window === 'undefined') {
    return DEFAULT_VIEW
  }
  const raw = localStorage.getItem(VIEW_STORAGE_KEY)
  if (raw && (VALID_VIEWS as readonly string[]).includes(raw)) {
    return raw as CurrentView
  }
  return DEFAULT_VIEW
}

const getView = (view: CurrentView) => {
  switch (view) {
    case 'all-components':
      return <MyDesignerApp/>
    case 'designer-only':
      return <DesignerOnly/>
    case 'viewer-rsuite-import':
      return <ViewerRsuiteImportCss/>
    case 'viewer-rsuite-load':
      return <ViewerRsuiteLoadCss/>
    default:
      return <ViewerOnly/>
  }
}

export const App = () => {
  const [currentView] = useState<CurrentView>(readStoredView)

  const switchView = useCallback(
    (view: CurrentView) => {
      return () => {
        if (view === currentView) {
          return
        }
        localStorage.setItem(VIEW_STORAGE_KEY, view)
        window.location.reload()
      }
    },
    [currentView]
  )

  const view = useMemo(() => {
    return getView(currentView)
  }, [currentView])

  return (
    <div>
      <div>
        <button type="button" onClick={switchView('all-components')} disabled={currentView === 'all-components'}>
          All Components
        </button>
        <button type="button" onClick={switchView('designer-only')} disabled={currentView === 'designer-only'}>
          Designer only
        </button>
        <button type="button" onClick={switchView('viewer-only')} disabled={currentView === 'viewer-only'}>
          Viewer only
        </button>
        <button type="button" onClick={switchView('viewer-rsuite-import')} disabled={currentView === 'viewer-rsuite-import'}>
          RSuite Viewer Import CSS
        </button>
        <button type="button" onClick={switchView('viewer-rsuite-load')} disabled={currentView === 'viewer-rsuite-load'}>
          RSuite Viewer Load CSS
        </button>
      </div>
      <div>{view}</div>
    </div>
  )
}
