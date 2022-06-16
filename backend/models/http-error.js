class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
    this.status = `${errorCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperatorError = true;
  }
}

module.exports = HttpError;
