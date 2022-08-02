// import { fatcher } from 'fatcher';
// import { json } from '@fatcherjs/middleware-json';
// import * as fs from 'fs';

// fatcher({
//     url: 'https://petstore.swagger.io/v2/swagger.json',
//     middlewares: [json()],
// }).then(res => {
//     fs.writeFileSync('./swagger.json', JSON.stringify(res.data, null, 2), 'utf-8');
// });

export * from './generator';
export * from './resolveConfig';
