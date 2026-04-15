import {lazy, Suspense, useCallback, useMemo, useState} from 'react'

const LazyMyDesignerApp = lazy(() =>
  import('./monaco-settings').then(() => import('./MyDesignerApp').then((m) => ({ default: m.default })))
)
const LazyDesignerOnly = lazy(() =>
  import('./monaco-settings').then(() => import('./DesignerOnly').then((m) => ({ default: m.DesignerOnly })))
)
const LazyViewerOnly = lazy(() => import('./ViewerOnly').then((m) => ({ default: m.ViewerOnly })))
const LazyViewerRsuiteImportCss = lazy(() =>
  import('./ViewerRsuiteImportCss').then((m) => ({ default: m.ViewerRsuiteImportCss }))
)
const LazyViewerRsuiteLoadCss = lazy(() =>
  import('./ViewerRsuiteLoadCss').then((m) => ({ default: m.ViewerRsuiteLoadCss }))
)

type CurrentView = 'all-components' | 'designer-only' | 'viewer-only' | 'viewer-rsuite-import' | 'viewer-rsuite-load' | 'none'

const VIEW_STORAGE_KEY = 'my-designer-view'

const DEFAULT_VIEW: CurrentView = 'viewer-only'

const VALID_VIEWS: readonly CurrentView[] = [
  'all-components',
  'designer-only',
  'viewer-only',
  'viewer-rsuite-import',
  'viewer-rsuite-load',
  'none'
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
      return <LazyMyDesignerApp/>
    case 'designer-only':
      return <LazyDesignerOnly/>
    case 'viewer-rsuite-import':
      return <LazyViewerRsuiteImportCss/>
    case 'viewer-rsuite-load':
      return <LazyViewerRsuiteLoadCss/>
    case 'viewer-only':
      return <LazyViewerOnly/>
    default:
      return null
  }
}

export const App = () => {
  const [currentView, setCurrentView] = useState<CurrentView>(readStoredView)
  const [reload, setReload] = useState<boolean>(false)
  const view = useMemo(() => getView(currentView), [currentView])

  const switchView = useCallback(
    (view: CurrentView) => {
      return () => {
        if (view === currentView) {
          return
        }
        localStorage.setItem(VIEW_STORAGE_KEY, view || '')
        if (reload) {
          window.location.reload()
        } else {
          setCurrentView(view)
        }
      }
    },
    [currentView, reload]
  )

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
          RSuite Viewer Inject CSS
        </button>
        <button type="button" onClick={switchView('none')} disabled={currentView === 'none'}>
          unload
        </button>
      </div>
      <div>
        <input type="checkbox" id={'reload'} value={reload ? 'checked' : ''} onClick={() => setReload((r) => !r)}/>
        <label htmlFor="reload">reload</label>
      </div>
      <Suspense fallback={<div>Loading view...</div>}>
        <div>{view}</div>
      </Suspense>
    </div>
  )
}
