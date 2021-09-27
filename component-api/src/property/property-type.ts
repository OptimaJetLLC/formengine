import LocalizedValue from '../locale/localized-value';

export default class PropertyType {
    constructor(public name: string,
                public description: LocalizedValue | null,
                public values: any[] = []) {
    }
}
