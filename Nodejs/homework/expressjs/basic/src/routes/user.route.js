import { get, create, update, remove, getAllUsersPosts, getPostsByUserId } from '../controllers/user.controller';
import { Router } from 'express';
import { validateGetPostsByUserId, validCreateUser, validGetFilter, validRemoveUser, validUpdateUser } from '../middleware/user.validation';
import { auth } from '../middleware/auth';

const router = Router();

router
    .route('/')
    .get(auth, validGetFilter, get)

router
    .route('/')
    .post(auth, validCreateUser, create)

router
    .route('/')
    .patch(auth, validUpdateUser, update)

router
    .route('/:id')
    .delete(auth, validRemoveUser, remove)

router
    .route('/posts')
    .get(auth, getAllUsersPosts)

router
    .route('/:user_id/posts')
    .get(auth, validateGetPostsByUserId, getPostsByUserId)

export default router;
