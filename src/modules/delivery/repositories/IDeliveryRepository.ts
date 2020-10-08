import Delivery from '../infra/typeorm/entities/Delivery';
import ICreateDeliveryDTOS from '../dtos/ICreateDeliveryDTOS';

export default interface IDeliveryRepository {
  create(data: ICreateDeliveryDTOS): Promise<Delivery>;
  findAll(): Promise<Delivery[] | undefined>;
}
