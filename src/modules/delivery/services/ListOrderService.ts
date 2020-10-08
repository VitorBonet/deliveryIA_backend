import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '@modules/delivery/infra/typeorm/entities/Order';
import IOrderRepository from '../repositories/IOrderRepository';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async show(): Promise<Order[] | undefined> {
    const orders = this.orderRepository.findAll();

    if (!orders) {
      throw new AppError('Não Encontrado');
    }

    return orders;
  }
}

export default ListOrderService;
