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
    .post(validCreateUser, create)

router
    .route('/posts')
    .get(auth, getAllUsersPosts)
    
router
    .route('/:user_id')
    .get(auth, validateGetPostsByUserId, getPostsByUserId)

router
    .route('/:id')
    .patch(auth, validUpdateUser, update)

router
    .route('/:id')
    .delete(auth, validRemoveUser, remove)

export default router;
