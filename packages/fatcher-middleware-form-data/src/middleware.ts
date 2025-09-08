import { isBrowser, isPlainObject } from '@fatcherjs/utils-shared';
import { FatcherMiddleware } from 'fatcher';

export const formData: FatcherMiddleware = {
  name: 'fatcher-middleware-formdata',
  use: (request, next) => {
    const { body } = request;

    if (!body) {
      return next();
    }

    if (request.headers.get('content-type')?.includes('multipart/form-data')) {
      if (isBrowser()) {
        request.headers.delete('content-type');
      }
    }

    if (body instanceof FormData) {
      return next();
    }

    if (isPlainObject(body)) {
      const form = new FormData();

      for (const [key, value] of Object.entries(body)) {
        if (Array.isArray(value)) {
          value.forEach(item => form.append(key, item));
        } else {
          form.append(key, value);
        }
      }

      return next(new Request(request, { body: form }));
    }

    return next();
  },
};
