import {useEffect, useMemo} from 'react'
import type {ViewMode} from '../../../types'
import {namedObserver} from '../../../utils'
import {useStore} from '../../../utils/contexts/StoreContext'
import {ComponentTree} from '../../ui/ComponentTree'
import {useViewerProps} from './ViewerPropsContext'

const getViewMode = (): ViewMode => {
  const width = window.innerWidth

  if (width <= 600) return 'mobile'
  if (width <= 900) return 'tablet'

  return 'desktop'
}

function useAutoViewMode() {
  const store = useStore()
  const props = useViewerProps()

  useEffect(() => {
    if (props.viewMode) {
      store.viewMode = props.viewMode
      return
    }

    const onResize = () => store.viewMode = getViewMode()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [props.viewMode, store])
}

/**
 * The React component of the form viewer, which displays the form itself with its components.
 * @returns the React element.
 */
const RawViewer = () => {
  const store = useStore()
  const {formLoadError} = store
  const props = useViewerProps()
  const data = useMemo(() => [store.form.componentTree], [store.form.componentTree])

  useAutoViewMode()

  useEffect(() => store.loadForm(props.getForm, props.formName), [store, props.getForm, props.formName])

  return formLoadError
    ? <div className={'form-error'}>{formLoadError}</div>
    : <ComponentTree data={data}/>
}

export const Viewer = namedObserver('Viewer', RawViewer)
