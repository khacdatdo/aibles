import { ErrorCodes } from './constants';

export function respondSuccess(data, message = 'Success') {
    const response = {
        code: ErrorCodes.ERROR_CODE_SUCCESS,
        message,
    };
    if (Object.keys(data).length > 0) {
        response.data = data;
    }
    return response;
}

export function responseWithError(errorCode, message = 'Error', data = {}) {
    const response = {
        code: errorCode,
        message,
    };
    if (Object.keys(data).length > 0) {
        response.errors = data;
    }
    return response;
}
