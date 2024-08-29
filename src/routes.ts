import { Router } from 'express';
import MeasureControllerIntance from './app/factories/MeasureControllerFactory';

const router = Router();

router.post('/upload', MeasureControllerIntance.create);
router.patch('/confirm', MeasureControllerIntance.confirm);
router.get('/:customer_code/list', MeasureControllerIntance.getAll);

export default router;
