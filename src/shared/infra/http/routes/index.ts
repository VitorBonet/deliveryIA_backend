import deliveryRouter from '@modules/delivery/infra/http/routes/delivery.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/delivery', deliveryRouter);

export default routes;
