import { Router } from 'express';
import multer from 'multer';

import AuthController from './app/controllers/AuthController';
import RecipientController  from './app/controllers/RecipientController';
import DeliverymanController  from './app/controllers/DeliverymanController';
import FileController  from './app/controllers/FileController';
import auth from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', AuthController.store);

routes.use(auth);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen/:deliveryman', DeliverymanController.show);
routes.put('/deliverymen/:deliveryman', DeliverymanController.update);
routes.delete('/deliverymen/:deliveryman', DeliverymanController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;