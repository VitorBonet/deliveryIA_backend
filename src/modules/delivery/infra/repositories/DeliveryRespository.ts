import { uuid } from 'uuidv4';

import IDeliveryRespository from '@modules/delivery/repositories/IDeliveryRepository';
// import ICreateUserDTOS from '@modules/users/dtos/ICreateUserDTOS';

import Delivery from '../entities/Delivery';

class DeliveryRespository implements IDeliveryRespository {
  private deliverys: Delivery[] = [];

  public async create(userData: Delivery): Promise<Delivery> {
    const delivery = new Delivery();

    Object.assign(delivery, { id: uuid() }, userData);

    this.deliverys.push(delivery);

    return delivery;
  }
}

export default DeliveryRespository;
