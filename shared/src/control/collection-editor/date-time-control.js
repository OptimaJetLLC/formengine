import BaseControl from './base-control';
import { draw } from '../../component-render-registry';

export default class DateTimeControl extends BaseControl {

    render() {
        return draw('collection-date-time', {
            me: this,
            props: this.props,
        });
    }
}
