import { container } from 'tsyringe';

import '@modules/delivery/providers';

import IDeliveryRespository from '@modules/delivery/repositories/IDeliveryRepository';
import DeliveryRespository from '@modules/delivery/infra/repositories/DeliveryRespository';

container.registerSingleton<IDeliveryRespository>(
  'DeliveryRespository',
  DeliveryRespository,
);
