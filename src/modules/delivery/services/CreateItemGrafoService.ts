import { injectable, inject } from 'tsyringe';

import ItemGrafo from '../infra/typeorm/entities/ItemGrafo';

import IGrafoRepository from '../repositories/IGrafoRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateDeliveryService {
  constructor(
    @inject('GrafoRepository')
    private grafoRepository: IGrafoRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<ItemGrafo> {
    const itemGrafo = await this.grafoRepository.create({
      name,
    });

    return itemGrafo;
  }
}

export default CreateDeliveryService;
