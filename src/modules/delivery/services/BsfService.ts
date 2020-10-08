import { injectable } from 'tsyringe';

import ItemGrafo from '../infra/typeorm/entities/ItemGrafo';
import VertexGrafo from '../infra/typeorm/entities/VertexGrafo';

interface IRequest {
  grafo: ItemGrafo[];
  start_id: string;
  destiny_id: string;
}

interface IResponse {
  time: number;
}

@injectable()
class BsfService {
  public async execute({
    grafo,
    start_id,
    destiny_id,
  }: IRequest): Promise<IResponse> {
    let queue = [];
    const visited: ItemGrafo[] = [];
    let sum_tot = 0;

    queue.push(start_id);
    while (queue.length > 0) {
      let sum = 0;
      const current = queue.shift();
      const grafo_find = grafo.find((itemGrafo) => itemGrafo.id === current);
      if (grafo_find) {
        visited.push(grafo_find);

        for (let i = 0; i < grafo_find.vertexs.length; i++) {
          const vertex: VertexGrafo = grafo_find.vertexs[i];
          const visited_detiny = visited.find(
            (visited_v) => visited_v.id === destiny_id,
          );

          const vertex_grafo = grafo.find(
            (vextex_graf) => vextex_graf.id === vertex.itemGrafo_second_id,
          );

          if (visited_detiny?.id) {
            queue = [];
            break;
          }
          if (!visited_detiny && vertex_grafo) {
            sum += vertex.value;
            queue.push(vertex.id);
            visited.push(vertex_grafo);
          }
        }

        sum_tot += sum;
      }
    }

    return { time: sum_tot };
  }
}

export default BsfService;
