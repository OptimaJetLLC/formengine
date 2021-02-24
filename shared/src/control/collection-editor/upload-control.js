import BaseControl from './base-control';
import { draw } from '../../component-render-registry';

export default class UploadControl extends BaseControl {

    render() {
        return draw('collection-upload', {
            me: this,
            props: this.props,
        });
    }
}
