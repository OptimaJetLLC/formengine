import BaseControl from './base-control';
import { draw } from '../../component-render-registry';

export default class DropdownControl extends BaseControl {

    render() {
        return draw('collection-dropdown', {
            me: this,
            props: this.props,
        });
    }
}
