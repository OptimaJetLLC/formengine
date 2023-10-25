/**
 * Calculable testing result.
 */
export class CalculableTestResult {

  /**
   * Constructor.
   * @param error the error.
   * @param result the result.
   * @param exceptions the exceptions.
   */
  constructor(readonly error = false, readonly result?: any, readonly exceptions?: Error[]) {
  }

  /**
   * Creates a new instance of the CalculableTestResult class with a successful result.
   * @param result the calculable result.
   * @returns the new instance of CalculableTestResult class.
   */
  static success(result: any) {
    return new CalculableTestResult(false, result)
  }

  /**
   * Creates a new instance of CalculableTestResult class with an error.
   * @param exceptions the exception array.
   * @returns the new instance of CalculableTestResult class.
   */
  static error(exceptions: Error[]) {
    return new CalculableTestResult(true, undefined, exceptions)
  }
}
