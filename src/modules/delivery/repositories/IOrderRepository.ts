import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTOS from '../dtos/ICreateOrderDTOS';

export default interface IOrderRepository {
  create(data: ICreateOrderDTOS): Promise<Order>;
  findAll(): Promise<Order[] | undefined>;
}
