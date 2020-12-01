import Delivery from '../infra/typeorm/entities/Delivery';
import ICreateDeliveryDTOS from '../dtos/ICreateDeliveryDTOS';

export default interface IDeliveryRepository {
  create(data: ICreateDeliveryDTOS): Promise<Delivery>;
  findAllByExec(exec: 'A1' | 'A2'): Promise<Delivery[] | undefined>;
}
