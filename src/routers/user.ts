import { Router } from 'express';
import userContro from '../controllers/user.controller';


const router = Router();

router.post('/registerNewUser', userContro.register);
router.get('/', userContro.obtain);


export { router };