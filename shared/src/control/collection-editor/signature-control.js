import BaseControl from './base-control';
import { draw } from '../../component-render-registry';

export default class SignatureControl extends BaseControl {

    render() {
        return draw('collection-signature', {
            me: this,
            props: this.props,
        });
    }
}
