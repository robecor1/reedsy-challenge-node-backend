import express from 'express';

let app

export const getExpressApp = () => {
  if (typeof app === 'undefined') {
    app = express()
  }

  return app
}