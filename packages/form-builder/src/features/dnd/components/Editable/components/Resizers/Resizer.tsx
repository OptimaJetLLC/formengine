import {cx} from '@emotion/css'
import {useBuilderStore} from 'fb-core'
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
      store.isResizing = true
      e.preventDefault()
      e.stopPropagation()
      const move = (e: MouseEvent) => {
        //TODO
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

