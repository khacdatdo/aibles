import { Router } from "express";
import { signin } from "../controllers/user.controller";
import { validateLogin } from "../middleware/user.validation";

const router = Router();

router
    .route('/')
    .post(validateLogin, signin)


export default router;