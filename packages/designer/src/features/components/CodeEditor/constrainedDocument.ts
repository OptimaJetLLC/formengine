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
  const prefix = getPrefixBeforeBody(beginContextLine, canEditBeginContextLine)
  let body = documentValue
  if (prefix && body.startsWith(prefix)) {
    body = body.slice(prefix.length)
  } else if (beginContextLine) {
    const prefixAt = body.indexOf(beginContextLine)
    if (prefixAt !== -1) {
      body = body.slice(prefixAt + beginContextLine.length)
      if (!canEditBeginContextLine && body.startsWith('\n')) {
        body = body.slice(1)
      }
    }
  }
  const postfix = getPostfix(endContextLine)
  if (postfix && body.endsWith(postfix)) {
    body = body.slice(0, body.length - postfix.length)
  }
  if (beginContextLine && !canEditBeginContextLine && body.startsWith('\n')) {
    body = body.slice(1)
  }
  if (endContextLine && body.endsWith('\n')) {
    body = body.slice(0, body.length - 1)
  }
  return body
}
