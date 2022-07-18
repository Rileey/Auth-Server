import { Router } from 'express';
const router = Router();

import AuthController from '../controller/auth_controller.js'

router.route('/register').post(AuthController.signup);
router.route('/users').get(AuthController.users);
router.route('/users/:user_id').get(AuthController.user);
router.route('/users/:user_id').delete(AuthController.delete);

export default router;