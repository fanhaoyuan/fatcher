import { FatcherMiddleware } from 'fatcher';

export const formData = (): FatcherMiddleware => {
  return (req, next) => {
    if (!req.body) {
      return next();
    }

    const contentType = req.headers.get('content-type') ?? '';

    if (contentType.includes('multipart/form-data')) {
      req.headers.delete('content-type');
    }

    if (req.body instanceof FormData) {
      return next();
    }

    if (typeof req.body === 'object') {
      const form = new FormData();

      for (const [key, value] of Object.entries(req.body)) {
        if (Array.isArray(value)) {
          value.forEach(item => form.append(key, item));
        } else {
          form.append(key, value);
        }
      }

      return next(new Request(req, { body: form }));
    }

    return next();
  };
};
