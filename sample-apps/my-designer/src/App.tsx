import {useCallback, useState} from 'react'
import {DesignerOnly} from './DesignerOnly'
import MyDesignerApp from './MyDesignerApp'

type CurrentView = 'all-components' | 'designer-only'

export const App = () => {
  const [currentView, setCurrentView] = useState<CurrentView>('designer-only')

  const switchView = useCallback((view: CurrentView) => {
    return () => {
      setCurrentView(view)
    }
  }, [])

  return <div>
    <div>
      <button onClick={switchView('all-components')} disabled={currentView === 'all-components'}>
        All Components
      </button>
      <button onClick={switchView('designer-only')} disabled={currentView === 'designer-only'}>
        Designer only
      </button>
    </div>
    <div>
      {currentView === 'all-components' ? <MyDesignerApp/> : <DesignerOnly/>}
    </div>
  </div>
}
