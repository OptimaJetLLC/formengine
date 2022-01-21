import { define } from '../../features/annotation/define';

export interface MessageProps {

}

export const Message = (props: MessageProps) => {
    // todo implement
    return (<>Message</>)
}

export const message = define('Message', Message, {}, []);
