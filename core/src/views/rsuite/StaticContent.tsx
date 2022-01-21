import { define } from '../../features/annotation/define';
import { string } from '../../features/annotation';

export interface StaticContentProps {
    content: string;
}

export const StaticContent = (props: StaticContentProps) => {
    const { content, ...otherProps } = props;
    return (<span {...otherProps}>{content}</span>);
}

export const staticContent = define('StaticContent', StaticContent, {
    content: string.isRequired('Text...'),
}, []);
