import { injectable, inject } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';

import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  time: number;
  itemGrafo_id: string | undefined;
  value: number;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({
    time,
    itemGrafo_id,
    value,
  }: IRequest): Promise<Order> {
    const delivery = await this.orderRepository.create({
      time,
      itemGrafo_id,
      value,
    });

    return delivery;
  }
}

export default CreateOrderService;
