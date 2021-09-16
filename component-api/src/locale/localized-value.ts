export default class LocalizedValue {
    constructor(public key: string,
                public defaultValue: string,
                public formName: string,
                public value?: any) {
    }
}
