import { EditForm, isUndefined } from 'optimajet-builder-shared';

export class DWKitReactNativeEditForm extends EditForm {

    saveValue(me, name, value) {
        return me.handleChange(null, {
            name: name,
            value: value,
            checked: null,
        });
    }

    handleTextChange(name) {
        const me = this;
        return function (value) {
            return me.saveValue(me, name, value);
        }
    }

    handleIntChange(name, intOnly) {
        const me = this;
        return function (value) {
            // todo uncontrolled
            if (value && value.match && value.match(/^-?\d+$/)) {
                value = parseInt(value);
            }
            if (intOnly === true) {
                if (Number.isSafeInteger(value) || value === null || isUndefined(value) || value === '') {
                    return me.saveValue(me, name, value);
                }
                return;
            }
            return me.saveValue(me, name, value);
        }
    }

}
