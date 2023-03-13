import fatcher from './fatcher';
import canActivate from './canActivate';
import defineMiddleware from './defineMiddleware';
import json from './json';
import isFatcherError from './isFatcherError';
import FatcherError from './FatcherError';

export * from './types';
export { fatcher, defineMiddleware, canActivate, isFatcherError, FatcherError };
// Middlewares
export { json };
