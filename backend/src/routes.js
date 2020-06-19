import { Router } from 'express';

import AuthController from './app/controllers/AuthController';
import RecipientController  from './app/controllers/RecipientController';
import DeliverymanController  from './app/controllers/DeliverymanController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/auth', AuthController.store);

routes.use(auth);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman/:deliveryman', DeliverymanController.show);
routes.put('/deliveryman/:deliveryman', DeliverymanController.update);
routes.put('/deliveryman/:deliveryman', DeliverymanController.delete);

export default routes;