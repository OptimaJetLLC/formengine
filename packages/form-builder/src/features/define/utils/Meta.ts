import {ReactNode} from 'react'
import {Annotation} from '../../annotation/types/annotations/Annotation'

// todo rename to BuilderComponentMetadata
/**
 * Component metadata for the form builder.
 */
export class Meta {
  /**
   * Creates the component metadata for the form builder.
   * @param type the component type name.
   * @param properties the component's properties metadata.
   * @param css the component's CSS metadata.
   * @param modules common metadata for the component.
   * @param customPreview the custom {@link ReactNode} to be drawn on the toolbar.
   * @param valuedAn the metadata for the component value.
   */
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
