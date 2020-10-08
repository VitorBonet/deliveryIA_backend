import { injectable, inject } from 'tsyringe';

import VertexGrafo from '../infra/typeorm/entities/VertexGrafo';

import IVertexGrafoRepository from '../repositories/IVertexGrafoRepository';

interface IRequest {
  value: number;
  itemGrafo_id: string;
  itemGrafo_second_id: string;
}

@injectable()
class CreateVertexGrafoService {
  constructor(
    @inject('VertexGrafoRespository')
    private vertexGrafoRespository: IVertexGrafoRepository,
  ) {}

  public async execute({
    value,
    itemGrafo_id,
    itemGrafo_second_id,
  }: IRequest): Promise<VertexGrafo> {
    const vertexGrafo = await this.vertexGrafoRespository.create({
      value,
      itemGrafo_id,
      itemGrafo_second_id,
    });

    return vertexGrafo;
  }
}

export default CreateVertexGrafoService;
