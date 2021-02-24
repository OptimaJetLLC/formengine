import BaseControl from './base-control';
import { draw } from '../../component-render-registry';

export default class InputControl extends BaseControl {

    render() {
        return draw('collection-input', {
            me: this,
            props: this.props,
        });
    }
}
