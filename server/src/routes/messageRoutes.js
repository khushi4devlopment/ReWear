import {Router} from 'express'; import {messages,send} from '../controllers/messageController.js'; import {protect} from '../middleware/auth.js';
const r=Router();r.use(protect);r.get('/:swapId',messages);r.post('/:swapId',send);export default r;
