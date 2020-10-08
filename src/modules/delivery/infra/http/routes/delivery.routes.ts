import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
// import { celebrate, Segments, Joi } from 'celebrate';

import DeliveryController from '@modules/delivery/infra/http/controllers/DeliveryController';
import GrafoController from '@modules/delivery/infra/http/controllers/GrafoController';
import UploadController from '@modules/delivery/infra/http/controllers/UploadController';

const deliveryRouter = Router();
const upload = multer(uploadConfig.multer);
const deliveryController = new DeliveryController();
const grafoController = new GrafoController();
const uploadController = new UploadController();

deliveryRouter.get('/', deliveryController.show);
deliveryRouter.get('/grafo', grafoController.show);
deliveryRouter.get('/teste', grafoController.teste);

deliveryRouter.patch(
  '/upload',
  upload.single('upload'),
  uploadController.create,
);

export default deliveryRouter;
