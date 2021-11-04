import { Router } from "express";
import { getById, create, update, remove } from "../controllers/post.controller";
import { auth } from "../middleware/auth";
import {
    validateGetPostById,
    validateCreatePost,
    validateUpdatePost,
    validateDeletePost
} from '../middleware/post.validation';


const router = Router();


router
    .route('/:id')
    .get(auth, validateGetPostById, getById);

router
    .route('/')
    .post(auth, validateCreatePost, create);

router
    .route('/')
    .patch(auth, validateUpdatePost, update);

router
    .route('/:id')
    .delete(auth, validateDeletePost, remove);

export default router;