import type {editor, IPosition} from 'monaco-editor'
import {getPostfix, getPrefixBeforeBody} from './constrainedDocument'

type EditableRangeParams = {
  /** End-exclusive offset of the editable body in the model text. */
  endExclusiveOffset: number
  /** Indicates whether the model includes a non-editable suffix context line. */
  hasEndContextLine: boolean
  /** Indicates whether the start context line is included in editable content. */
  isBeginContextEditable: boolean
}

type EditablePositionRange = {
  startPosition: IPosition
  endPosition: IPosition
}

/**
 * Computes editable metadata that does not require position conversion.
 * @param model Monaco text model.
 * @param canEditBeginContextLine when true, begin context is editable.
 * @param endContextLine optional non-editable suffix context.
 * @returns editable metadata values.
 */
export function getEditableRangeParams(
  model: editor.ITextModel,
  canEditBeginContextLine: boolean | undefined,
  endContextLine: string | undefined
): EditableRangeParams {
  const hasEndContextLine = !!endContextLine
  const isBeginContextEditable = !!canEditBeginContextLine
  const postfix = getPostfix(endContextLine)
  const endExclusiveOffset = model.getValue().length - postfix.length

  return {endExclusiveOffset, hasEndContextLine, isBeginContextEditable}
}

const getEndPosition = (
  model: editor.ITextModel,
  hasEndContextLine: boolean,
  endExclusiveOffset: number,
  bodyStartOffset: number,
  startPosition: IPosition
): IPosition => {
  if (!hasEndContextLine) {
    const fullRange = model.getFullModelRange()
    return {lineNumber: fullRange.endLineNumber, column: fullRange.endColumn}
  }

  if (endExclusiveOffset <= bodyStartOffset) {
    return startPosition
  }

  return model.getPositionAt(endExclusiveOffset)
}

/**
 * Computes start/end Monaco positions for the editable body.
 * @param model Monaco text model.
 * @param beginContextLine optional begin context line.
 * @param canEditBeginContextLine when true, begin context is editable.
 * @param hasEndContextLine indicates whether a suffix context exists.
 * @param endExclusiveOffset end-exclusive body offset.
 * @returns start/end positions for the editable body.
 */
export function getEditablePositionRange(
  model: editor.ITextModel,
  beginContextLine: string | undefined,
  canEditBeginContextLine: boolean | undefined,
  hasEndContextLine: boolean,
  endExclusiveOffset: number
): EditablePositionRange {
  const prefixBeforeBody = getPrefixBeforeBody(beginContextLine, canEditBeginContextLine)
  const bodyStartOffset = prefixBeforeBody.length
  const startPosition = model.getPositionAt(bodyStartOffset)
  const endPosition = getEndPosition(model, hasEndContextLine, endExclusiveOffset, bodyStartOffset, startPosition)

  return {startPosition, endPosition}
}

