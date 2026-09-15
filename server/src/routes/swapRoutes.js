import {Router} from 'express'; import {create,mine,changeStatus} from '../controllers/swapController.js'; import {protect} from '../middleware/auth.js';
const r=Router();r.use(protect);r.get('/',mine);r.post('/',create);r.patch('/:id/status',changeStatus);export default r;
