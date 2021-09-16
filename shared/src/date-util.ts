import { isDefined } from './helpers';
import Numeral from 'numeral';
import { dwKitDateFormat } from './dwkit-util';

const moment = require('moment');

function getFormattedDate(str: string | null | undefined, data: any) {
    if (!str) {
        return '';
    }

    let propertyName;
    let format = undefined;
    let indexSep = str.indexOf(':');
    if (indexSep > 0) {
        propertyName = str.substring(0, indexSep);
        format = str.substring(indexSep + 1, str.length)
    } else {
        propertyName = str;
    }

    let value = data[propertyName];
    if (value === null || typeof value === 'undefined') {
        value = '';
    }

    if (isDefined(format)) {
        if (typeof value === 'number') {
            value = Numeral(value).format(format);
        } else {
            const dateValue = moment(value);
            if (dateValue.isValid()) {
                if (format === 'local') {
                    let localFormat = dwKitDateFormat('L');
                    value = dateValue.format(localFormat);
                } else {
                    value = dateValue.format(format);
                }
            }
        }
    }

    return value;
}

export default {
    getFormattedDate: getFormattedDate
}
