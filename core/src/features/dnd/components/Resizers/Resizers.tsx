import {Resizer} from "./Resizer";

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

export const Resizers = ({show}: ResizersProps) => {

    if (!show) return null

    return <>
        {positions.map(value => <Resizer key={value} position={value}/>)}
    </>
}