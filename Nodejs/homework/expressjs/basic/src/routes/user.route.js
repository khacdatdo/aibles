import { get, create, update, remove, getAllUsersPosts, getPostsByUserId } from '../controllers/user.controller';
import { Router } from 'express';
import { validateGetPostsByUserId, validCreateUser, validGetFilter, validRemoveUser, validUpdateUser } from '../middleware/user.validation';

const router = Router();

router
    .route('/')
    .get(validGetFilter, get)

router
    .route('/')
    .post(validCreateUser, create)

router
    .route('/')
    .patch(validUpdateUser, update)

router
    .route('/:id')
    .delete(validRemoveUser, remove)

router
    .route('/posts')
    .get(getAllUsersPosts)

router
    .route('/:user_id/posts')
    .get(validateGetPostsByUserId, getPostsByUserId)

export default router;
