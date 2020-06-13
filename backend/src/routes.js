import { Router } from 'express';

import AuthController from './app/controllers/AuthController';
import RecipientController  from './app/controllers/RecipientController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/auth', AuthController.store);

routes.use(auth);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;