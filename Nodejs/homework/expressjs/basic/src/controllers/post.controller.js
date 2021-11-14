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
    return new Promise(function (success, fail) {
        getAllPosts().then(function (posts) {
            success(res.json(respondSuccess(posts)));
        });
    })
}

function getById(req, res) {
    return new Promise(function (success, fail) {
        getPostById(req.params.id).then(function (post) {
            success(res.json(respondSuccess(post)));
        }).catch(function (err) {
            fail(err);
            return res.status(ErrorCodes.ERROR_CODE_API_NOT_FOUND)
                .json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND, 'Error', err));
        })
    }).catch(function (e) {
        console.log('Error');
    });
}

function create(req, res) {
    return new Promise(function (success, fail) {
        createPost(req.body)
            .then(function (r) {
                success(res.json(respondSuccess({}, 'Create post successfully')));
            })
            .catch(function (e) {
                fail(e);
                return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
                    .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Error', e));
            });
    }).catch(function (e) {
        //  maybe write to logger
        console.error('Error');
    })
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