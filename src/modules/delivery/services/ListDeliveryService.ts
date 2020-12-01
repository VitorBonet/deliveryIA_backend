import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Delivery from '@modules/delivery/infra/typeorm/entities/Delivery';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

@injectable()
class ListDeliveryService {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async show(exec: 'A1' | 'A2'): Promise<Delivery[] | undefined> {
    const deliverys = this.deliveryRepository.findAllByExec(exec);

    if (!deliverys) {
      throw new AppError('Nenhum item Encontrado');
    }

    return deliverys;
  }
}

export default ListDeliveryService;
