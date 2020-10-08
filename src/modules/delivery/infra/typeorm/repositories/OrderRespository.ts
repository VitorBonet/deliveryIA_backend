import { getRepository, Repository } from 'typeorm';

import IOrderRepository from '@modules/delivery/repositories/IOrderRepository';
import ICreateOrderDTOS from '@modules/delivery/dtos/ICreateOrderDTOS';

import Order from '../entities/Order';

class OrderRespository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({
    time,
    itemGrafo_id,
    value,
  }: ICreateOrderDTOS): Promise<Order> {
    const order = this.ormRepository.create({
      time,
      itemGrafo_id,
      value,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async findAll(): Promise<Order[] | undefined> {
    const orders = await this.ormRepository.find({
      relations: ['itemGrafo'],
    });

    return orders;
  }
}

export default OrderRespository;
