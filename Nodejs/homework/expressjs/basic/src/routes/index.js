import { Router } from 'express';
import userRoutes from './user.route';

const router = Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/users', userRoutes);

module.exports = router;
