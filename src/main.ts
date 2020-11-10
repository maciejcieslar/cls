import express, { RequestHandler } from 'express';
import { v4 } from 'uuid';

import { applicationNamespace, REQUEST_ID_KEY } from './namespace';
import { log } from './logger';

const attachContext: RequestHandler = (req, res, next) => {
  applicationNamespace.run(() => next());
};

const setRequestId: RequestHandler = (req, res, next) => {
  applicationNamespace.set(REQUEST_ID_KEY, v4());

  next();
};

const nestedHandler = () => {
  log('This is a nested handler.');
};

const helloWorldHandler: RequestHandler = (req, res) => {
  log('This is a hello world log message.');

  nestedHandler();

  res.send('Hello world');
};

async function bootstrap() {
  const app = express();
  const port = 3000;

  // context middleware
  app.use(attachContext, setRequestId);

  // routes
  app.get('/', helloWorldHandler);

  app.listen(port, () => {
    console.log(`Listening on port: ${port}.`);
  });
}

bootstrap();
