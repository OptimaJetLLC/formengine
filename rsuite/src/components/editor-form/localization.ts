import L10n from './l10n'

export interface L10nProps {
    key: string;
    defaultValue: string;
    formName?: string;
    localization?: L10n;
}

export function localize(key: string,
                         defaultValue: string,
                         block: string = 'base',
                         localization?: L10n): string {
    if (localization) {
        const l10nBlock = localization.get(block);
        if (l10nBlock) {
            return l10nBlock.get(key) ?? defaultValue;
        }
    }
    return defaultValue;
}

export function L10n(props: L10nProps) {
    // todo add context
    return localize(props.key, props.defaultValue, props.formName, props.localization);
}
