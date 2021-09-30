import { get, create, update, remove } from '../controllers/user.controller';
import { Router } from 'express';
import { validCreateUser, validGetFilter, validRemoveUser, validUpdateUser } from '../middleware/user.validation';

const router = Router();

router
    .route('/')
    .get(validGetFilter, get)
    .post(validCreateUser, create)
    .patch(validUpdateUser, update)
    .delete(validRemoveUser, remove)

export default router;
