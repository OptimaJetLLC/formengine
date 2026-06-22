/**
 * Converts number of bytes to human-readable string.
 * @param size number of bytes.
 * @returns number of bytes to human-readable string.
 */
export const humanizeFileSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = 0
  while (size >= 1024) {
    size /= 1024
    ++i
  }
  const res = [size.toFixed(2), units[i]]
  return res.join(' ')
}
