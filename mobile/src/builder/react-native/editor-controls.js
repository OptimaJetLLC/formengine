import reactNativeControlsInstance from './viewer-controls';
import '../../components/react-native/registrator/react-native-registrator-editor';
import { getItems } from 'optimajet-builder-shared';

reactNativeControlsInstance.setItems(getItems());

export default reactNativeControlsInstance;
