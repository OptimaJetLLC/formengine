import {useCallback, useMemo, useState} from 'react'
import {DesignerOnly} from './DesignerOnly'
import MyDesignerApp from './MyDesignerApp'
import {ViewerOnly} from './ViewerOnly'

type CurrentView = 'all-components' | 'designer-only' | 'viewer-only'

const getView = (view: CurrentView) => {
  switch (view) {
    case 'all-components':
      return <MyDesignerApp/>
    case 'designer-only':
      return <DesignerOnly/>
    default:
      return <ViewerOnly/>
  }
}

export const App = () => {
  const [currentView, setCurrentView] = useState<CurrentView>('viewer-only')

  const switchView = useCallback((view: CurrentView) => {
    return () => {
      setCurrentView(view)
    }
  }, [])

  const view = useMemo(() => {
    return getView(currentView)
  }, [currentView])

  return <div>
    <div>
      <button onClick={switchView('all-components')} disabled={currentView === 'all-components'}>
        All Components
      </button>
      <button onClick={switchView('designer-only')} disabled={currentView === 'designer-only'}>
        Designer only
      </button>
      <button onClick={switchView('viewer-only')} disabled={currentView === 'viewer-only'}>
        Viewer only
      </button>
    </div>
    <div>
      {view}
    </div>
  </div>
}
