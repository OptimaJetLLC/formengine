import {fastQr} from './fast-qr'
import fastQrEnUsComponentsDescriptions from './i18n/en-US.json'

export const fastQrComponent = fastQr
export const fastQrModel = fastQr.build().model
export type {FastQrProps} from './fast-qr'

export {fastQrEnUsComponentsDescriptions}
export {fastQrComponentsDescriptions} from './i18n/fastQrComponentsDescriptions'
