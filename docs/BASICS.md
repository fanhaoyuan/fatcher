# Basics

Because fatcher is based on fetch and enhances its functionality, the basic usage is consistent with fetch.

## Send A Request

We must set `url` in a fatcher request.

```ts
import { fatcher } from 'fatcher';

fatcher({
    url: 'https://examples.com/bar/foo',
}).then(result => {
    // Response
    const { data, status, statusText, headers } = result;

    // ...
});
```

## Catch Errors

Fatcher will throw an `FatcherError` when response code is not match validator code.. So we can use isFatcherError to distinguish between fatcher error and other errors.

```ts
import { fatcher, isFatcherError } from 'fatcher';

fatcher({
    url: 'https://examples.com/bar/foo',
})
    .then(result => {
        // Response
        const { data, status } = result;
    })
    .catch(err => {
        // Catch Fatcher Error
        if (isFatcherError(err)) {
            // Request successfully. But response status code is not match validator code.
            console.error(err.toJSON());
            return;
        }

        // This is other errors.
    });
```
