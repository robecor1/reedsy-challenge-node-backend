// Customer Error
// Can add additional features like integration with Slack, Datadog, etc...


export class CustomError extends Error {
  public message;

  constructor(message) {
    super(message);
    this.message = message
  }

}