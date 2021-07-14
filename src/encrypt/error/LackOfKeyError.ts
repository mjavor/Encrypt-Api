export class LackOfKeyError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
