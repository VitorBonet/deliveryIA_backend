import { getRepository, Repository } from 'typeorm';

import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import ICreateDeliveryDTOS from '@modules/delivery/dtos/ICreateDeliveryDTOS';

import Delivery from '../entities/Delivery';

class DeliveryRepository implements IDeliveryRepository {
  private ormRepository: Repository<Delivery>;

  constructor() {
    this.ormRepository = getRepository(Delivery);
  }

  public async create({
    order_id,
    exec,
    seq,
    type,
  }: ICreateDeliveryDTOS): Promise<Delivery> {
    const delivery = this.ormRepository.create({
      order_id,
      exec,
      seq,
      type,
    });

    await this.ormRepository.save(delivery);

    return delivery;
  }

  public async findAll(): Promise<Delivery[] | undefined> {
    const deliverys = await this.ormRepository.find({
      relations: ['order', 'order.itemGrafo'],
    });

    return deliverys;
  }
}

export default DeliveryRepository;
