import { Router } from 'express';
import userRoutes from './user.route';
import postRouters from './post.route';

const router = Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/users', userRoutes);

router.use('/posts', postRouters);

module.exports = router;
