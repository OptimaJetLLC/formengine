import reactNativeControlsInstance from './dwkit-react-native-form-controls';
import '../../components/react-native/registrator/react-native-registrator-viewer';
import { getItems } from 'optimajet-builder-shared';

reactNativeControlsInstance.setItems(getItems());

export default reactNativeControlsInstance;
