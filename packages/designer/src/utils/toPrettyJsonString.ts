/**
 * Serializes a value as JSON.
 * @param value the value to serialize.
 * @param space the JSON.stringify space argument.
 * @returns the JSON string, or undefined if serialization fails.
 */
export function toPrettyJsonString(value: unknown, space?: number): string | undefined {
  try {
    return JSON.stringify(value, null, space)
  } catch {
    return
  }
}
