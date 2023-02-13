import { parseURL } from '../src/utils';

describe('Parse URL', () => {
    it('Base URL and request URL', () => {
        const parsedURL = parseURL('/base', '/request');

        expect(parsedURL).toBe('/base/request');
    });

    it('Base URL and request URL with suffix "/"', () => {
        const parsedURL = parseURL('/base', '/request/');

        expect(parsedURL).toBe('/base/request');
    });

    it('Base URL with suffix "/" and request URL', () => {
        const parsedURL = parseURL('/base/', '/request');

        expect(parsedURL).toBe('/base/request');
    });

    it('Base URL with suffix "/" and request URL with "/"', () => {
        const parsedURL = parseURL('/base/', '/request/');

        expect(parsedURL).toBe('/base/request');
    });

    it('Empty base URL and request URL', () => {
        const parsedURL = parseURL('', '/request');

        expect(parsedURL).toBe('/request');
    });

    it('Root base URL and request URL', () => {
        const parsedURL = parseURL('/', '/request');

        expect(parsedURL).toBe('/request');
    });

    it('Base URL and empty request url', () => {
        const parsedURL = parseURL('/base', '');

        expect(parsedURL).toBe('/base');
    });

    it('Base URL and root request url', () => {
        const parsedURL = parseURL('/base', '/');

        expect(parsedURL).toBe('/base');
    });

    it('Root base URL and absolute request url', () => {
        const parsedURL = parseURL('/', 'https://virual.com/request');

        expect(parsedURL).toBe('https://virual.com/request');
    });

    it('Base URL and absolute request url', () => {
        const parsedURL = parseURL('/base', 'https://virual.com/request');

        expect(parsedURL).toBe('https://virual.com/request');
    });

    it('Absolute base URL and absolute request url', () => {
        const parsedURL = parseURL('https://virual.com/base', 'https://virual.com/request');

        expect(parsedURL).toBe('https://virual.com/request');
    });

    it('Absolute base URL and normal request url', () => {
        const parsedURL = parseURL('https://virual.com/base', '/request');

        expect(parsedURL).toBe('https://virual.com/base/request');
    });

    it('Base URL and request url with querystring', () => {
        const parsedURL = parseURL('/base', '/request?method=get');

        expect(parsedURL).toBe('/base/request?method=get');
    });

    it('Base URL and request url with href querystring', () => {
        const parsedURL = parseURL('/base', '/request?href=https://virual.com/get/json');

        expect(parsedURL).toBe('/base/request?href=https://virual.com/get/json');
    });

    it('Base URL and request url with two href querystring', () => {
        const parsedURL = parseURL(
            '/base',
            '/request?href=https://virual.com/get/json&ref=https://virual.com/post/blob'
        );

        expect(parsedURL).toBe('/base/request?href=https://virual.com/get/json&ref=https://virual.com/post/blob');
    });

    it('Absolute base URL and relative request URL', () => {
        const a = parseURL('https://virual.com/base', './request');

        expect(a).toBe('https://virual.com/base/request');

        const b = parseURL('https://virual.com/base', '../request');

        expect(b).toBe('https://virual.com/request');
    });

    it('Base URL and relative request URL', () => {
        const a = parseURL('/base', './request');

        expect(a).toBe('/base/request');

        const b = parseURL('/base', '../request');

        expect(b).toBe('/request');
    });

    it('Empty base URL and relative request URL', () => {
        const parsedURL = parseURL('', './request');

        expect(parsedURL).toBe('/request');
    });

    it('Root base URL and relative request URL', () => {
        const parsedURL = parseURL('/', '../request');

        expect(parsedURL).toBe('/request');
    });

    it('Root base URL and request URL without "/"', () => {
        const parsedURL = parseURL('/', 'request');

        expect(parsedURL).toBe('/request');
    });

    it('Empty base URL and request URL without "/"', () => {
        const parsedURL = parseURL('', 'request');

        expect(parsedURL).toBe('/request');
    });

    it('Absolute base URL and request URL without "/"', () => {
        const parsedURL = parseURL('https://virual.com/base', 'request');

        expect(parsedURL).toBe('https://virual.com/base/request');
    });
});
