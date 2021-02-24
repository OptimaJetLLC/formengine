import reactNativeControlsInstance from './controls-for-forms';
import '../components/registrator/edit-controls';
import { getItems } from 'optimajet-builder-shared';

reactNativeControlsInstance.setItems(getItems());

export default reactNativeControlsInstance;
