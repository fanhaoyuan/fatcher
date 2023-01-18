import { Rules } from 'async-validator';
import { RequestMethod } from 'fatcher';
import {
    MockjsRandomAddress,
    MockjsRandomBasic,
    MockjsRandomColor,
    MockjsRandomDate,
    MockjsRandomImage,
    MockjsRandomMiscellaneous,
    MockjsRandomName,
    MockjsRandomText,
    MockjsRandomWeb,
} from 'mockjs';

export type MockType =
    | keyof MockjsRandomBasic
    | keyof MockjsRandomAddress
    | keyof MockjsRandomColor
    | keyof MockjsRandomDate
    | keyof MockjsRandomImage
    | keyof MockjsRandomMiscellaneous
    | keyof MockjsRandomName
    | keyof MockjsRandomText
    | keyof MockjsRandomWeb;

export interface MockSchema {
    [key: string]: MockType;
}

export interface MockHeaders {
    headers?: Record<string, string>;
}

export interface ValidateSchema {
    type: 'string' | 'boolean' | 'number';
    required?: boolean;
}

export interface MockValidatorSchema extends MockHeaders {
    params?: Rules;
    body?: Rules;
    method?: RequestMethod;
}

export interface MockResultSchema extends MockHeaders {
    body?: MockSchema;
    status?: number;
    statusText?: string;
}

export interface MockConfig {
    url: string;
    validator?: MockValidatorSchema;
    result?: MockResultSchema;
}
