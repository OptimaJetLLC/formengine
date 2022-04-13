import {componentMarkup, PLACEHOLDERS} from "./consts";
import {ArgumentValue} from "../event/types";
import {Store} from "../../stores/Store";
import {isString} from "../../utils";

export const makeMentionsMarkup = (markup: string, id: string, display: string) => {
    return markup
        .replace(PLACEHOLDERS.id, id)
        .replace(PLACEHOLDERS.display, display)
}

// escape RegExp special characters https://stackoverflow.com/a/9310752/5142490
export const escapeRegex = (str: string) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

export const markupToRegex = (markup: string) => {
    const escapedMarkup = escapeRegex(markup)
    const charAfterDisplay =
        markup[markup.indexOf(PLACEHOLDERS.display) + PLACEHOLDERS.display.length]
    const charAfterId =
        markup[markup.indexOf(PLACEHOLDERS.id) + PLACEHOLDERS.id.length]
    return new RegExp(
        escapedMarkup
            .replace(
                PLACEHOLDERS.display,
                `([^${escapeRegex(charAfterDisplay || '')}]+?)`
            )
            .replace(PLACEHOLDERS.id, `([^${escapeRegex(charAfterId || '')}]+?)`),
        "g"
    )
}

export function processBinds(value: ArgumentValue, store: Store) {
    if (isString(value))
        return processText(value)

    return value


    function processText(value: string) {
        const regex = markupToRegex(componentMarkup)
        return value.replace(regex, (match, display, key) => {
            let node = store.findNode(key)
            return node?.data.props[display] ?? ""
        })
    }
}