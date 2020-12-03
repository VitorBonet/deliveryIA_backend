import { injectable, inject, container } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';

import IDeliveryRepository from '../repositories/IDeliveryRepository';
import IGrafoRepository from '../repositories/IGrafoRepository';
import IOrderRepository from '../repositories/IOrderRepository';

import DijkstraService from './DijkstraService';
import WisService from './WisService';
import CreateDeliveryService from './CreateDeliveryService';

interface IOrderTimes {
  order_id: string;
  value: number;
  start: number;
  end: number;
}

interface IResponse {
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
    const dijkstraService = container.resolve(DijkstraService);
    const wisService = container.resolve(WisService);
    const createDeliveryService = container.resolve(CreateDeliveryService);

    const used: Order[] = [];
    let not_used: Order[] = [];
    let wis;

    const grafo = await this.grafoRepository.findAll();
    const orders = await this.orderRepository.findAll();

    if (grafo && orders) {
      const initial_grafo_index = grafo.findIndex(
        (itemGraf) => itemGraf.name === 'A',
      );

      const initial_grafo = grafo[initial_grafo_index];

      const orders_times = [] as IOrderTimes[];

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const item_grafo = grafo?.find(
          (itemGrafo) => itemGrafo.id === order.itemGrafo_id,
        );

        if (item_grafo) {
          const dijkstra = await dijkstraService.execute({
            grafo,
            start_id: initial_grafo.id,
            destiny_id: item_grafo.id,
          });

          const order_times = {
            order_id: order.id,
            value: order.value,
            start: order.time,
            end: order.time + dijkstra.time * 2,
          };

          orders_times.push(order_times);
        }
      }

      wis = await wisService.execute({ orders_times });

      not_used = orders;
      let seqIn = 1;
      wis.used.forEach(async (id) => {
        not_used = not_used.filter((order) => order.id !== id);

        await createDeliveryService.execute({
          order_id: id,
          exec: 'A2',
          seq: seqIn,
          type: 'Income',
        });

        seqIn += 1;
      });

      let seqOut = 1;
      not_used.forEach(async (order) => {
        await createDeliveryService.execute({
          order_id: order.id,
          exec: 'A2',
          seq: seqOut,
          type: 'Outcome',
        });

        seqOut += 1;
      });
    }

    return { value: wis?.value || 0, used, not_used };
  }
}

export default ExecuteA1Service;
