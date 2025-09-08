import { isBrowser, isPlainObject } from '@fatcherjs/utils-shared';
import { FatcherMiddleware } from 'fatcher';

export const formData: FatcherMiddleware = {
  name: 'fatcher-middleware-formdata',
  use: (ctx, next) => {
    const { body } = ctx;

    if (!body) {
      return next();
    }

    if (ctx.request.headers.get('content-type')?.includes('multipart/form-data')) {
      if (isBrowser()) {
        ctx.request.headers.delete('content-type');
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

      return next(new Request(ctx.request, { body: form }));
    }

    return next();
  },
};
