import { getRepository, Repository } from 'typeorm';

import IVertexGrafoRepository from '@modules/delivery/repositories/IVertexGrafoRepository';
import ICreateVertexGrafoDTOS from '@modules/delivery/dtos/ICreateVertexGrafoDTOS';

import VertexGrafo from '../entities/VertexGrafo';

class VertexGrafoRespository implements IVertexGrafoRepository {
  private ormRepository: Repository<VertexGrafo>;

  constructor() {
    this.ormRepository = getRepository(VertexGrafo);
  }

  public async create({
    value,
    itemGrafo_id,
    itemGrafo_second_id,
  }: ICreateVertexGrafoDTOS): Promise<VertexGrafo> {
    const vertexGrafo = this.ormRepository.create({
      value,
      itemGrafo_id,
      itemGrafo_second_id,
    });

    await this.ormRepository.save(vertexGrafo);

    return vertexGrafo;
  }
}

export default VertexGrafoRespository;
