import type {Definer, Model} from '@react-form-builder/core'
import {fastQr} from './fast-qr'
import type {FastQrProps} from './fast-qr'
import fastQrEnUsComponentsDescriptions from './i18n/en-US.json'

export const fastQrComponent: Definer<FastQrProps> = fastQr
export const fastQrModel: Model = fastQr.build().model
export type {FastQrProps} from './fast-qr'

export {fastQrEnUsComponentsDescriptions}
export {fastQrComponentsDescriptions} from './i18n/fastQrComponentsDescriptions'
