import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import DeliveryController from '@modules/delivery/infra/http/controllers/DeliveryController';
import UploadController from '@modules/delivery/infra/http/controllers/UploadController';

const deliveryRouter = Router();
const upload = multer(uploadConfig.multer);
const deliveryController = new DeliveryController();
const uploadController = new UploadController();

deliveryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  deliveryController.create,
);

deliveryRouter.patch(
  '/upload',
  upload.single('upload'),
  uploadController.create,
);

export default deliveryRouter;
