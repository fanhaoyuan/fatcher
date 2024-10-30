import { isBrowser, isPlainObject } from '@fatcherjs/utils-shared';
import { FatcherMiddleware } from 'fatcher';

export const formData = () => {
  return ((req, next) => {
    const { body } = req.options;

    if (!body) {
      return next();
    }

    if (req.headers.get('content-type')?.includes('multipart/form-data')) {
      if (isBrowser()) {
        req.headers.delete('content-type');
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

      return next(new Request(req, { body: form }));
    }

    return next();
  }) as FatcherMiddleware;
};
