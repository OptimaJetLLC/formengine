import DWKitReactNativeFormBuilder from '../builder/react-native/dwkit-react-native-form-builder';
import reactNativeControlsInstance from '../builder/react-native/editor-controls';

export default class DWKitFormBuilder extends DWKitReactNativeFormBuilder {

    constructor(props) {
        super(props);
        this.dwKitControls = reactNativeControlsInstance;
    }

}
