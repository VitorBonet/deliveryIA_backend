import { container } from 'tsyringe';

import '@modules/delivery/providers';

import IDeliveryRespository from '@modules/delivery/repositories/IDeliveryRepository';
import DeliveryRespository from '@modules/delivery/infra/repositories/DeliveryRespository';

import IGrafoRepository from '@modules/delivery/repositories/IGrafoRepository';
import GrafoRepository from '@modules/delivery/infra/repositories/GrafoRepository';

container.registerSingleton<IDeliveryRespository>(
  'DeliveryRespository',
  DeliveryRespository,
);

container.registerSingleton<IGrafoRepository>(
  'GrafoRepository',
  GrafoRepository,
);
