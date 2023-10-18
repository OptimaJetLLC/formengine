/**
 * Represents a function that validate the form data.
 */
export type ExternalFormValidator = (data: Record<string, unknown>) => Promise<Record<string, string> | undefined>

/**
 * Represents an array of functions that validate the form data.
 */
export type ExternalFormValidators = ExternalFormValidator[]
