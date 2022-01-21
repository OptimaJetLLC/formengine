import { define } from '../../features/annotation/define';

export interface CustomControlProps {

}

export const CustomControl = (props: CustomControlProps) => {
    // todo implement
    return (<>CustomControl</>)
}

export const customControl = define('Custom control', CustomControl, {}, []);
