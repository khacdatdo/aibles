import { Router } from "express";
import { create, update, remove } from "../controllers/post.controller";
import {
    validateCreatePost,
    validateUpdatePost,
    validateDeletePost
} from '../middleware/post.validation';


const router = Router();



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