import { injectable, inject } from 'tsyringe';

import ICreateDeliveryDTOS from '@modules/delivery/dtos/ICreateDeliveryDTOS';
import Delivery from '../infra/typeorm/entities/Delivery';

import IDeliveryRepository from '../repositories/IDeliveryRepository';

@injectable()
class CreateDeliveryService {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  public async execute({
    order_id,
    exec,
    seq,
    type,
  }: ICreateDeliveryDTOS): Promise<Delivery> {
    const delivery = await this.deliveryRepository.create({
      order_id,
      exec,
      seq,
      type,
    });

    return delivery;
  }
}

export default CreateDeliveryService;
