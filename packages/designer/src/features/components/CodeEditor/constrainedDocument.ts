function getContentDelimiter(beginContextLine: string | undefined, canEditBeginContextLine: boolean | undefined): string {
  return beginContextLine && canEditBeginContextLine ? '' : '\n'
}

/**
 * Returns text before the editable body (prefix plus optional delimiter).
 * @param beginContextLine optional prefix block before editable body.
 * @param canEditBeginContextLine when true, the prefix is part of the editable range.
 * @returns prefix string placed before the body in the Monaco document.
 */
export function getPrefixBeforeBody(beginContextLine: string | undefined, canEditBeginContextLine: boolean | undefined): string {
  const prefix = beginContextLine ?? ''
  const delimiter = getContentDelimiter(beginContextLine, canEditBeginContextLine)
  if (!beginContextLine) {
    return delimiter
  }
  return prefix + delimiter
}

/**
 * Returns text after the editable body.
 * @param endContextLine optional suffix block after editable body.
 * @returns postfix string placed after the body in the Monaco document.
 */
export function getPostfix(endContextLine: string | undefined): string {
  return endContextLine ? `\n${endContextLine}` : ''
}

/**
 * Builds the full Monaco document from context lines and editable body.
 * @param body editable source body.
 * @param beginContextLine optional prefix block before editable body.
 * @param canEditBeginContextLine when true, the prefix is part of the editable range.
 * @param endContextLine optional suffix block after editable body.
 * @returns full document value for the Monaco model.
 */
export function buildConstrainedDocument(
  body: string,
  beginContextLine: string | undefined,
  canEditBeginContextLine: boolean | undefined,
  endContextLine: string | undefined
): string {
  return getPrefixBeforeBody(beginContextLine, canEditBeginContextLine) + body + getPostfix(endContextLine)
}

/**
 * Extracts the raw body between context wrappers without normalizing newlines.
 * Use this when rewrapping an in-editor draft so blank lines are preserved.
 * @param documentValue full Monaco document text.
 * @param beginContextLine optional prefix block before editable body.
 * @param canEditBeginContextLine when true, the prefix is part of the editable range.
 * @param endContextLine optional suffix block after editable body.
 * @returns body text between the context wrappers, or the full value when wrappers are absent.
 */
function extractConstrainedBody(
  documentValue: string,
  beginContextLine: string | undefined,
  canEditBeginContextLine: boolean | undefined,
  endContextLine: string | undefined
): string {
  const prefix = getPrefixBeforeBody(beginContextLine, canEditBeginContextLine)
  const postfix = getPostfix(endContextLine)
  let start = 0
  let end = documentValue.length

  if (prefix) {
    if (documentValue.startsWith(prefix)) {
      start = prefix.length
    } else if (beginContextLine) {
      const prefixAt = documentValue.indexOf(beginContextLine)
      if (prefixAt !== -1) {
        start = prefixAt + beginContextLine.length
        if (!canEditBeginContextLine && documentValue.startsWith('\n', start)) {
          start += 1
        }
      }
    }
  }

  if (postfix && documentValue.endsWith(postfix, end)) {
    end -= postfix.length
  }

  return end < start ? '' : documentValue.slice(start, end)
}

type ConstrainedDocumentSource = {
  initialValue: string | undefined
  beginContextLine?: string
  canEditBeginContextLine?: boolean
  endContextLine?: string
}

/**
 * Resolves the next full Monaco document when the source or context changes.
 * Keeps the current draft body when only the context changes; replaces the body when the source changes.
 * @param currentDocument the live Monaco document text.
 * @param previous the last applied source and context.
 * @param next the incoming source and context.
 * @returns the next full document value for the Monaco model.
 */
export function resolveNextConstrainedDocument(
  currentDocument: string,
  previous: ConstrainedDocumentSource,
  next: ConstrainedDocumentSource
): string {
  const body =
    previous.initialValue === next.initialValue
      ? extractConstrainedBody(currentDocument, previous.beginContextLine, previous.canEditBeginContextLine, previous.endContextLine)
      : (next.initialValue ?? '')
  return buildConstrainedDocument(body, next.beginContextLine, next.canEditBeginContextLine, next.endContextLine)
}

/**
 * Extracts the editable body from a full document value.
 * @param documentValue full Monaco document text.
 * @param beginContextLine optional prefix block before editable body.
 * @param canEditBeginContextLine when true, the prefix is part of the editable range.
 * @param endContextLine optional suffix block after editable body.
 * @returns editable body without context lines.
 */
export function extractEditableBody(
  documentValue: string,
  beginContextLine: string | undefined,
  canEditBeginContextLine: boolean | undefined,
  endContextLine: string | undefined
): string {
  let body = extractConstrainedBody(documentValue, beginContextLine, canEditBeginContextLine, endContextLine)
  if (beginContextLine && !canEditBeginContextLine && body.startsWith('\n')) {
    body = body.slice(1)
  }
  if (endContextLine && body.endsWith('\n')) {
    body = body.slice(0, body.length - 1)
  }
  return body
}
