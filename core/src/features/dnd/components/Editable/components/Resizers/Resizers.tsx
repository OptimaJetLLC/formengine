import {Resizer} from "./Resizer";
import {observer} from "mobx-react";

//Идейный вдохновитель: https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d

const positions = [
    'left',
    'right',
    'top',
    'bottom',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
]

type ResizersProps = {
    show: boolean
}

export const Resizers = observer(({show}: ResizersProps) => {

    if (!show) return null

    return <div>
        {positions.map(value => <Resizer key={value} position={value}/>)}
    </div>
})