import { getRepository, Repository } from 'typeorm';

import IGrafoRepository from '@modules/delivery/repositories/IGrafoRepository';
import ICreateItemGrafoDTOS from '@modules/delivery/dtos/ICreateItemGrafoDTOS';

import ItemGrafo from '../entities/ItemGrafo';

class GrafoRespository implements IGrafoRepository {
  private ormRepository: Repository<ItemGrafo>;

  constructor() {
    this.ormRepository = getRepository(ItemGrafo);
  }

  public async create({ name }: ICreateItemGrafoDTOS): Promise<ItemGrafo> {
    const itemGrafo = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(itemGrafo);

    return itemGrafo;
  }

  public async findById(id: string): Promise<ItemGrafo | undefined> {
    const itemGrafo = await this.ormRepository.findOne(id);

    return itemGrafo;
  }

  public async findByName(name: string): Promise<ItemGrafo | undefined> {
    const itemGrafo = await this.ormRepository.findOne({
      where: { name },
    });

    return itemGrafo;
  }

  public async findAll(): Promise<ItemGrafo[] | undefined> {
    const itemGrafo = await this.ormRepository.find({
      relations: ['vertexs'],
      order: {
        name: 'ASC',
      },
    });

    return itemGrafo;
  }
}

export default GrafoRespository;
