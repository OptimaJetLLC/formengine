import {signature} from './Signature'
import signatureEnUsComponentsDescriptions from './i18n/en-US.json'

export const signatureComponent = signature
export const signatureModel = signature.build().model
export type {SignatureProps} from './SignatureProps'

export {signatureEnUsComponentsDescriptions}
export {signatureComponentsDescriptions} from './i18n/signatureComponentsDescriptions'
