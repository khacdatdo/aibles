import { Router } from "express";
import { create, signin } from "../controllers/user.controller";
import { refreshToken } from "../middleware/auth";
import { validateLogin, validCreateUser } from "../middleware/user.validation";

const router = Router();

router
    .route('/login')
    .post(validateLogin, signin)

router
    .route('/register')
    .post(validCreateUser, create)

router.route('/refresh-token')
    .post(refreshToken)


export default router;