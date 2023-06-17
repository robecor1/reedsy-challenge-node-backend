// Customer Logger
// Can add additional features like integration with Winston, Slack, Datadog, etc...

export const logInfo = (props) => {
  if (process.env.env !== 'test') {
    console.log(props)
  }
}

export const logError = (props) => {
  if (process.env.env !== 'test') {
  console.log(props)
  }
}
