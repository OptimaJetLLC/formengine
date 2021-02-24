import BaseControl from './base-control';
import { draw } from '../../component-render-registry';

export default class CameraControl extends BaseControl {

    render() {
        return draw('collection-camera', {
            me: this,
            props: this.props,
        });
    }
}
