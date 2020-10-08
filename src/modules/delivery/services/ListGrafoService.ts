import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ItemGrafo from '@modules/delivery/infra/typeorm/entities/ItemGrafo';
import IGrafoRepository from '../repositories/IGrafoRepository';

@injectable()
class ListGrafoService {
  constructor(
    @inject('GrafoRepository')
    private grafoRepository: IGrafoRepository,
  ) {}

  async show(): Promise<ItemGrafo[] | undefined> {
    const grafo = this.grafoRepository.findAll();

    if (!grafo) {
      throw new AppError('Not found');
    }

    return grafo;
  }
}

export default ListGrafoService;
