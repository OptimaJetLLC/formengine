export function exhaustiveCheck(param: never): never {
  throw new Error(`Unprocessed value: ${param}`)
}
