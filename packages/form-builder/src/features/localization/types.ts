import {BiDi} from './bidi'

/**
 * The language to localize the form builder.
 */
export class Language {

  /**
   * Creates a localization language for the form builder.
   * @param code the language code, for example, 'en'.
   * @param dialect the dialect code, for example, 'US'.
   * @param name the name of the language, for example 'English'.
   * @param description the description of the language, for example 'American English'.
   * @param bidi the type of text layout, for example, BiDi.LTR.
   */
  constructor(
    readonly code: string,
    readonly dialect: string,
    readonly name: string,
    readonly description: string,
    readonly bidi: BiDi = BiDi.LTR,
  ) {
  }
}

/**
 * The type of callback function called during language initialization.
 */
export type OnInitCallback = (language: string) => void;
