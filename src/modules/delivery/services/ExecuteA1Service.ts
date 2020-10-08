import { injectable, inject, container } from 'tsyringe';

import ICreateDeliveryDTOS from '@modules/delivery/dtos/ICreateDeliveryDTOS';
import Delivery from '../infra/typeorm/entities/Delivery';
import Order from '../infra/typeorm/entities/Order';

import IDeliveryRepository from '../repositories/IDeliveryRepository';
import IGrafoRepository from '../repositories/IGrafoRepository';
import IOrderRepository from '../repositories/IOrderRepository';

import BsfService from './BsfService';
import CreateDeliveryService from './CreateDeliveryService';

interface IResponse {
  time: number;
  value: number;
  used: Order[];
  not_used: Order[];
}

@injectable()
class ExecuteA1Service {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,

    @inject('GrafoRepository')
    private grafoRepository: IGrafoRepository,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const bsfService = container.resolve(BsfService);
    const createDeliveryService = container.resolve(CreateDeliveryService);

    const used: Order[] = [];
    const not_used: Order[] = [];
    let time = 0;
    let value = 0;
    let seqIn = 0;
    let seqOut = 0;

    const grafo = await this.grafoRepository.findAll();
    const orders = await this.orderRepository.findAll();

    if (grafo && orders) {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const item_grafo = grafo?.find(
          (itemGrafo) => itemGrafo.id === order.itemGrafo_id,
        );

        if (item_grafo && (order.time >= time || time === 0)) {
          seqIn += 1;

          used.push(order);
          await createDeliveryService.execute({
            order_id: order.id,
            exec: 'A1',
            seq: seqIn,
            type: 'Income',
          });

          const bsf = await bsfService.execute({
            grafo,
            start_id: grafo[0].id,
            destiny_id: item_grafo.id,
          });

          if (bsf) {
            time += bsf.time * 2;
            value += order.value;
          }
        } else {
          seqOut += 1;

          not_used.push(order);
          await createDeliveryService.execute({
            order_id: order.id,
            exec: 'A1',
            seq: seqOut,
            type: 'Outcome',
          });
        }
      }
    }

    return { time, value, used, not_used };
  }
}

export default ExecuteA1Service;
