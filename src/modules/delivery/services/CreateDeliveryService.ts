import { injectable, inject } from 'tsyringe';

import Delivery from '../infra/entities/Delivery';

import IDeliveryRepository from '../repositories/IDeliveryRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateDeliveryService {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Delivery> {
    const delivery = await this.deliveryRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return delivery;
  }
}

export default CreateDeliveryService;
