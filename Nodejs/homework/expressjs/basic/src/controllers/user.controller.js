import { ErrorCodes, respondSuccess, responseWithError } from '../helpers';

import { createUser, deleteUser, getPostsByUserId as getPByUId, getUsers, getUsersWithPosts, updateUser, login } from '../services/user.service';


async function signin(req, res) {
    try {
        const data = await login(req.body);
        return res.json(respondSuccess(data, 'Login successfully'));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, error.message));
    }
}

async function create(req, res) {
    try {
        const userData = req.body;
        const user = await createUser(userData);
        return res.json(respondSuccess({}, 'User created successfully'));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, error.message));
    }
}

async function get(req, res) {
    try {
        const default_filter = {
            id: null,
            name: null,
            sex: null,
            age: null,
            per_page: 20,
            page: 1
        }
        const filter = req.query;
        const users = await getUsers(Object.assign(default_filter, filter));
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Error', error));
    }
}

async function update(req, res) {
    try {
        const user = req.body;
        user.id = req.params.id;
        const updatedUser = await updateUser(user);
        return res.json(respondSuccess({}, 'User updated successfully'));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_API_NOT_FOUND)
            .json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, error.message));
    }
}

async function remove(req, res) {
    try {
        const {
            id
        } = req.params;
        const users = await deleteUser(id);
        return res.json(respondSuccess({}, 'User deleted successfully'));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_API_NOT_FOUND)
            .json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, error.message));
    }
}

function getAllUsersPosts(req, res) {
    return new Promise(function (success, fail) {
        getUsersWithPosts().then(function (r) {
            success(r);
            return res.json(respondSuccess(r));
        }).catch(function (e) {
            fail(e);
            return res.status(ErrorCodes.ERROR_CODE_SYSTEM_ERROR)
                .json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'Unknown Error', e));
        })
    }).catch(function (e) {
        // write to logger
        console.error('Error');
    })
}

function getPostsByUserId(req, res) {
    const { user_id } = req.params;
    const { limit } = req.query || 2;
    return new Promise(function (success, fail) {
        getPByUId(user_id, limit)
            .then(function (r) {
                success(r);
                return res.json(respondSuccess(r));
            })
            .catch(function (err) {
                fail(err);
                return res.status(ErrorCodes.ERROR_CODE_API_NOT_FOUND)
                    .json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, err.message));
            });
    }).catch(function (e) {
        // write to logger
        console.error('Error');
    });
}


export {
    create,
    get,
    update,
    remove,
    getAllUsersPosts,
    getPostsByUserId,
    signin
}
