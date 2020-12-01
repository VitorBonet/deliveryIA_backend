import { injectable } from 'tsyringe';

import ItemGrafo from '../infra/typeorm/entities/ItemGrafo';

interface IOrderTimes {
  order_id: string;
  value: number;
  start: number;
  end: number;
}

interface IRequest {
  orders_times: IOrderTimes[];
}

interface IResponseWisService {
  value: number;
  used: string[];
}

@injectable()
class WisService {
  public async execute({
    orders_times,
  }: IRequest): Promise<IResponseWisService> {
    const ids = ['0'];
    const v = [0];
    const p = [0];
    const m = [0];
    // ordenar order_times pelo tempo de fim
    orders_times.sort((a, b) => {
      if (a.end > b.end) return 1;
      if (a.end < b.end) return -1;
      // a must be equal to b
      return 0;
    });

    orders_times.forEach((ord_tim) => {
      ids.push(ord_tim.order_id);
      v.push(ord_tim.value);
    });

    // encontrar array predecessoras
    for (let i = 0; i < orders_times.length; i++) {
      const order_times = orders_times[i];

      if (i === 0) p.push(0);

      for (let y = i - 1; y >= 0; y--) {
        const order_times_ant = orders_times[y];

        if (order_times_ant.end <= order_times.start) {
          p.push(y + 1);
          break;
        }
      }

      if (!p[i + 1]) p[i + 1] = 0;
    }

    for (let i = 0; i < ids.length; i++) {
      m[i] = Math.max(v[i] + m[p[i]], m[i - 1] || 0);
    }

    // Pega o caminho do maior valor
    const ids_used = [] as string[];
    function findSolution(j: number) {
      if (j === 0) {
        ids_used.push(ids[p.length - 1]);
      } else if (v[j] + m[p[j]] >= m[j - 1]) {
        ids_used.push(ids[j]);
        findSolution(p[j]);
      } else {
        findSolution(p[j - 1]);
      }
    }

    findSolution(p[p.length - 1]);

    const value = m[m.length - 1];

    return { value, used: ids_used };
  }
}

export default WisService;
