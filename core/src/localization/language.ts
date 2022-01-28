export enum BiDi {
    ltr = 'ltr',
    rtl = 'rtl',
}

export interface Language {
    readonly code: string;
    readonly dialect: string;
    readonly biDi: BiDi;
    readonly name: string;
    readonly description: string;
}