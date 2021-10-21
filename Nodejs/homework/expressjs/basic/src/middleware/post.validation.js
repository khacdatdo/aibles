import {
    responseWithError, ErrorCodes
} from '../helpers';
import { RegexNumber } from '../helpers/regex';

function validateGetPostById(req, res, next) {
    const { id } = req.params;
    if (!id || id * 1 < 1) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid id'));
    }
    return next();
}

function validateCreatePost(req, res, next) {
    const { context, user_id, tags } = req.body;
    if (!context || !user_id || !tags) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid argument'));
    }
    if (!RegexNumber.test(user_id)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid user_id'));
    }
    if (typeof tags != 'object') {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid type of tags'));
    }
    return next();
}

function validateUpdatePost(req, res, next) {
    const { id, updates, tags } = req.body;
    if (!id || !updates) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid argument'));
    }
    if (!RegexNumber.test(id)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid id'));
    }
    if (typeof updates != 'object') {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid type of updates'));
    }
    if (tags && typeof tags != 'object') {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid type of updates.tags'));
    }
    return next();
}

function validateDeletePost(req, res, next) {
    const { id } = req.params;
    if (!id || !RegexNumber.test(id)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid id'));
    }
    return next();
}

module.exports = {
    validateGetPostById,
    validateCreatePost,
    validateUpdatePost,
    validateDeletePost
};