import {
  isBoolean
} from 'lodash'

/** Class representing a python workspace. */
export default class PythonWorkspace {
  /**
   * Create a python workspace object.
   * @param {Object} runner - The runner to which the python workspace belongs.
   */
  constructor (runner) {
    // Set class parameter properties.
    this._runner = runner // Parent runner attached to the python workspace class.
  }

  /**
   * Evaluate an expression within osweb.
   * @param {Boolean|Object|String} bytecode - The expression to evaluate.
   * @return {Boolean|Number|Object|String} - The result of the evaluated expression.
   */
  _eval (bytecode) {
    // Check wich type of expression must be evaled.
    if (isBoolean(bytecode)) {
      return bytecode
    } else if (typeof bytecode === 'string') {
      // Open sesame script, first check for parameter values.
      bytecode = this._runner._syntax.eval_text(bytecode, null, true)

      // Evaluate the expression.
      var evalString = this._runner._syntax.remove_quotes(bytecode)
      if (evalString === 'always') {
        return true
      } else if (evalString === 'never') {
        return false
      } else {
        // eslint-disable-next-line no-eval
        return eval(evalString)
      }
    } else {
      // Python script, run the internal Python interpreter.
      return this._runner._pythonParser._run_statement(bytecode)
    }
  }
}
