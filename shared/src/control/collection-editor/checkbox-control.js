import BaseControl from './base-control';
import { draw } from '../../component-render-registry';

export default class CheckboxControl extends BaseControl {

    render() {
        return draw('collection-checkbox', {
            me: this,
            props: this.props,
        });
    }
}
