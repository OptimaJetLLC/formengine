import {cx} from '@emotion/css'
import {resizerStyles} from './styles'

type ResizerProps = {
  position: string
}

//TODO допилить изменение ширины и высоты. Для этого получать componentStore и сетиться на его стили
export const Resizer = ({position}: ResizerProps) => {

  return <div
    className={cx(resizerStyles, position)}
    onMouseDown={(e: any) => {
      e.preventDefault()
      e.stopPropagation()
      const move = (e: MouseEvent) => {
        //TODO
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', (e) => {
        window.removeEventListener('mousemove', move)
      }, {once: true})
    }}
  >

  </div>
}

