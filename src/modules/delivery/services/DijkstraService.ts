import { injectable } from 'tsyringe';
import Graph from 'node-dijkstra';

import ItemGrafo from '../infra/typeorm/entities/ItemGrafo';

interface IRequest {
  grafo: ItemGrafo[];
  start_id: string;
  destiny_id: string;
}

interface IResponse {
  time: number;
}

@injectable()
class Dijkstra {
  public async execute({
    grafo,
    start_id,
    destiny_id,
  }: IRequest): Promise<IResponse> {
    const graph = new Graph();

    grafo.forEach((itemGrafo) => {
      const vert = [] as string[];
      itemGrafo.vertexs.forEach((v) => {
        vert[v.itemGrafo_second_id] = v.value;
      });

      graph.addNode(itemGrafo.id, vert);
    });

    const cost = graph.path(start_id, destiny_id, { cost: true });

    return { time: cost.cost };
  }
}

export default Dijkstra;
