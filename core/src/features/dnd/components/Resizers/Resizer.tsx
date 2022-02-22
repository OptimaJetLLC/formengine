import {useStore} from "../../../../utils/StoreContext";
import {resizerStyles} from "./styles";
import {cx} from "@emotion/css";

type ResizerProps = {
    position: string
}

//TODO допилить изменение ширины и высоты. Для этого получать componentStore и сетиться на его стили
export const Resizer = ({position}: ResizerProps) => {
    const store = useStore()

    return <div
        className={cx(resizerStyles, position)}
        onMouseDown={(e: any) => {
            //TODO
            store.dnd.isResizing = true;
            e.preventDefault();
            e.stopPropagation();
            const move = (e: MouseEvent) => {
                console.log(e.clientX)
            };
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', (e) => {
                store.dnd.isResizing = false;
                window.removeEventListener('mousemove', move);
            }, {once: true});
        }}
    >

    </div>
}

