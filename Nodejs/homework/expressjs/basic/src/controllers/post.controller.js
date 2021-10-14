import { 
    ErrorCodes, 
    respondSuccess, 
    responseWithError 
} from '../helpers';
import {
    createPost,
    updatePost,
    deletePost
} from '../services/post.service';


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
    create,
    update,
    remove
}