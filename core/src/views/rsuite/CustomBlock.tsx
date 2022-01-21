import { define } from '../../features/annotation/define';

export interface CustomBlockProps {

}

export const CustomBlock = (props: CustomBlockProps) => {
    // todo implement
    return (<>CustomBlock</>)
}

export const customBlock = define('Custom block', CustomBlock, {}, []);
