import { container } from 'tsyringe';

import '@modules/delivery/providers';

import IOrderRepository from '@modules/delivery/repositories/IOrderRepository';
import OrderRespository from '@modules/delivery/infra/typeorm/repositories/OrderRespository';

import IGrafoRepository from '@modules/delivery/repositories/IGrafoRepository';
import GrafoRepository from '@modules/delivery/infra/typeorm/repositories/GrafoRepository';

import IVertexGrafoRepository from '@modules/delivery/repositories/IVertexGrafoRepository';
import VertexGrafoRespository from '@modules/delivery/infra/typeorm/repositories/VertexGrafoRespository';

import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import DeliveryRepository from '@modules/delivery/infra/typeorm/repositories/DeliveryRepository';

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRespository,
);

container.registerSingleton<IGrafoRepository>(
  'GrafoRepository',
  GrafoRepository,
);

container.registerSingleton<IVertexGrafoRepository>(
  'VertexGrafoRespository',
  VertexGrafoRespository,
);

container.registerSingleton<IDeliveryRepository>(
  'DeliveryRepository',
  DeliveryRepository,
);
