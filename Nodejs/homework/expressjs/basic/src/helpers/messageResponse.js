import { ErrorCodes } from './constants';

export function respondSuccess(data, message = 'Success') {
    return {
        code: ErrorCodes.ERROR_CODE_SUCCESS,
        message,
        data,
    };
}

export function responseWithError(errorCode, message = 'Error', data = {}) {
    return {
        code: errorCode,
        message,
        errors: data,
    };
}
