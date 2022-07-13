import { Router } from 'express';
const router = Router();

import AuthController from '../controller/auth_controller.js'

router.route('/register').post(AuthController.signup);

export default router;