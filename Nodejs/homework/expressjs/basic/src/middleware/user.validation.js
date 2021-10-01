import { RegexName, RegexNumber, RegexSex } from '../helpers/regex';
import {
    responseWithError, ErrorCodes
} from '../helpers';

function validCreateUser(req, res, next) {
    const {
        name, sex, age
    } = req.body;
    if (!name || !sex || !age) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid argument'));
    }
    if (!RegexName.test(name)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid name'));
    }
    if (!RegexSex.test(sex)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid sex'));
    }
    if (!RegexNumber.test(age) || age * 1 < 1 || age * 1 > 150) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid age'));
    }
    return next();
}

function validGetFilter(req, res, next) {
    const filter = req.query;
    if (filter.id && !RegexNumber.test(filter.id)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid filter id'));
    }
    if (filter.name && !RegexName.test(filter.name)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid filter name'));
    }
    if (filter.sex && !RegexSex.test(filter.sex)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid filter sex'));
    }
    if (filter.age && !RegexNumber.test(filter.age)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid filter age'));
    }
    if (filter.per_page && !RegexNumber.test(filter.per_page)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid filter per_page'));
    }
    if (filter.page && !RegexNumber.test(filter.page)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid filter page'));
    }
    return next();
}

function validUpdateUser(req, res, next) {
    const {
        id, name, sex, age
    } = req.body;
    if (!RegexNumber.test(id) || !id) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid id'));
    }
    if (name && !RegexName.test(name)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid name'));
    }
    if (sex && !RegexSex.test(sex)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid sex'));
    }
    if (age && !RegexNumber.test(age) || age * 1 < 1 || age * 1 > 150) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid age'));
    }
    return next();
}

function validRemoveUser(req, res, next) {
    const {
        id
    } = req.params;
    if (!id || !RegexNumber.test(id)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid argument. Expected id'));
    }
    return next();
}

export {
    validCreateUser, validGetFilter, validUpdateUser, validRemoveUser
}
