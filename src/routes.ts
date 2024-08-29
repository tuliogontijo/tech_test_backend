import { Router } from 'express';
import MeasureControllerIntance from './factories/MeasureControllerFactory';

const router = Router();

const { create, confirm, getAll } = MeasureControllerIntance;

router.post('/upload', create);
router.patch('/confirm', confirm);
router.get('/:customer_code/list', getAll);

export default router;
