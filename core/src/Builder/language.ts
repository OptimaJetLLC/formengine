export enum BiDi {
    ltr = 'ltr',
    rtl = 'rtl',
}

export interface Language {
    code: string;
    biDi: BiDi;
    name: string;
}