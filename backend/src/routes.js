import { Router } from 'express';
import multer from 'multer';

import AuthController from './app/controllers/AuthController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';

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

routes.get('/deliverymen/:deliveryman/deliveries', DeliveryController.index);
routes.get('/deliverymen/:deliveryman/deliveries/:delivery/delivered', DeliveryController.delivered);
routes.put('/deliverymen/:deliveryman/deliveries/:delivery', DeliveryController.update);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.get('/orders/:order', OrderController.show);
routes.put('/orders/:order', OrderController.update);
routes.delete('/orders/:order', OrderController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;