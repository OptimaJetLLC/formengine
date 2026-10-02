import type {Definer, Model} from '@react-form-builder/core'
import signatureEnUsComponentsDescriptions from './i18n/en-US.json'
import {signature} from './Signature'
import type {SignatureProps} from './SignatureProps'

export const signatureComponent: Definer<SignatureProps> = signature
export const signatureModel: Model = signature.build().model
export {signatureComponentsDescriptions} from './i18n/signatureComponentsDescriptions'
export type {SignatureProps} from './SignatureProps'
export {signatureEnUsComponentsDescriptions}
