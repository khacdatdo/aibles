import {
    ErrorCodes,
    respondSuccess,
    responseWithError
} from '../helpers';
import {
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getAllPosts
} from '../services/post.service';


function getAll(req, res) {
    try {
        const posts = getAllPosts();
        return res.json(respondSuccess(posts));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, error.message));
    }
}

function getById(req, res) {
    try {
        const post = getPostById(req.params.id);
        return res.json(respondSuccess(post));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_API_NOT_FOUND)
            .json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, error.message));
    }
}

function create(req, res) {
    try {
        const post = createPost(req.body);
        return res.json(respondSuccess({}, 'Create post successfully'));
    } catch (error) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, error.message));
    }
}

function update(req, res) {
    return new Promise(function (success, fail) {
        updatePost(Object.assign(req.body, req.params))
            .then(function (r) {
                success(res.json(respondSuccess({}, 'Update post successfully')));
            })
            .catch(function (e) {
                fail(e);
                return res.status(ErrorCodes.ERROR_CODE_API_NOT_FOUND)
                    .json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, e.message));
            });
    }).catch(function (e) {
        //  maybe write to logger
        console.error('Error');
    })
}

function remove(req, res) {
    return new Promise(function (success, fail) {
        deletePost(req.params.id)
            .then(function (r) {
                success(res.json(respondSuccess({}, 'Delete post successfully')));
            })
            .catch(function (e) {
                fail(e);
                return res.status(ErrorCodes.ERROR_CODE_API_NOT_FOUND)
                    .json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, e.message));
            });
    }).catch(function (e) {
        //  maybe write to logger
        console.error('Error');
    })
}


export {
    getAll,
    getById,
    create,
    update,
    remove
};