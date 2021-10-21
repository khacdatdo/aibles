import { Router } from "express";
import { getById, create, update, remove } from "../controllers/post.controller";
import {
    validateGetPostById,
    validateCreatePost,
    validateUpdatePost,
    validateDeletePost
} from '../middleware/post.validation';


const router = Router();


router
    .route('/:id')
    .get(validateGetPostById, getById);

router
    .route('/')
    .post(validateCreatePost, create);

router
    .route('/')
    .patch(validateUpdatePost, update);

router
    .route('/:id')
    .delete(validateDeletePost, remove);

module.exports = router;