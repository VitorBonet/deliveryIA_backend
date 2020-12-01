import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListGrafoService from '@modules/delivery/services/ListGrafoService';
import ExecuteA2Service from '@modules/delivery/services/ExecuteA2Service';

export default class GrafoController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listGrafoService = container.resolve(ListGrafoService);

    const grafo = await listGrafoService.show();

    return response.json(grafo);
  }

  public async teste(request: Request, response: Response): Promise<Response> {
    const executeA2Service = container.resolve(ExecuteA2Service);

    const grafo = await executeA2Service.execute();

    return response.json(grafo);
  }
}
