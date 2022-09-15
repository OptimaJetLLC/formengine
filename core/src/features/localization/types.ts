import {BiDi} from './consts'

export class Language {
  constructor(
    readonly code: string,
    readonly dialect: string,
    readonly name: string,
    readonly description: string,
    readonly bidi: BiDi = BiDi.LTR,
  ) {
  }
}

export type OnInitCallback = (language: string) => void;
