import {cx} from '@emotion/css'
import {useBuilderStore} from '../../../../../../utils/contexts/BuilderStoreContext'
import {resizerStyles} from './styles'

type ResizerProps = {
  position: string
}

//TODO допилить изменение ширины и высоты. Для этого получать componentStore и сетиться на его стили
export const Resizer = ({position}: ResizerProps) => {
  const store = useBuilderStore()

  return <div
    className={cx(resizerStyles, position)}
    onMouseDown={(e: any) => {
      //TODO
      store.isResizing = true
      e.preventDefault()
      e.stopPropagation()
      const move = (e: MouseEvent) => {
        console.log(e.clientX)
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', (e) => {
        store.isResizing = false
        window.removeEventListener('mousemove', move)
      }, {once: true})
    }}
  >

  </div>
}

