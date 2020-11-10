import { applicationNamespace, REQUEST_ID_KEY } from './namespace';

export const log  = (message: string) => {
  const requestId = applicationNamespace.get(REQUEST_ID_KEY);

  console.log({
    message,
    requestId,
  });
};
