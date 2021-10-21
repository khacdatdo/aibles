import {
    ErrorCodes,
    respondSuccess,
    responseWithError
} from '../helpers';
import {
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../services/post.service';


function getById(req, res) {
    return new Promise(function (success, fail) {
        getPostById(req.params.id).then(function (post) {
            success(res.json(respondSuccess(post)));
        }).catch(function (err) {
            fail(err);
            return res.json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Error', err));
        })
    }).catch(function (e) {
        console.log('Error');
    });
}

function create(req, res) {
    return new Promise(function (success, fail) {
        createPost(req.body)
            .then(function (r) {
                success(res.json(respondSuccess(r)));
            })
            .catch(function (e) {
                fail(e);
                return res.json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Error', e));
            });
    }).catch(function (e) {
        //  maybe write to logger
        console.error('Error');
    })
}

function update(req, res) {
    return new Promise(function (success, fail) {
        updatePost(req.body)
            .then(function (r) {
                success(res.json(respondSuccess(r)));
            })
            .catch(function (e) {
                fail(e);
                return res.json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Error', e));
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
                success(res.json(respondSuccess(r)));
            })
            .catch(function (e) {
                fail(e);
                return res.json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Error', e));
            });
    }).catch(function (e) {
        //  maybe write to logger
        console.error('Error');
    })
}


module.exports = {
    getById,
    create,
    update,
    remove
}