import {ReactNode} from 'react'
import {Annotation} from '../../annotation/types/annotations/Annotation'

export class Meta {
  constructor(
    readonly type: string,
    readonly properties: Annotation[],
    readonly css: Annotation[],
    readonly modules: Annotation[],
    readonly customPreview?: ReactNode,
    readonly valuedAn?: Annotation,
  ) {
  }
}
