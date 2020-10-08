import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListGrafoService from '@modules/delivery/services/ListGrafoService';
import ExecuteA1Service from '@modules/delivery/services/ExecuteA1Service';

export default class GrafoController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listGrafoService = container.resolve(ListGrafoService);

    const grafo = await listGrafoService.show();

    return response.json(grafo);
  }

  public async teste(request: Request, response: Response): Promise<Response> {
    const executeA1Service = container.resolve(ExecuteA1Service);

    const grafo = await executeA1Service.execute();

    return response.json(grafo);
  }
}
