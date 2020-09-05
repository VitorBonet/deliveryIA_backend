import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ImportGrafoService from '@modules/delivery/services/ImportGrafoService';

export default class UploadController {
  public async create(request: Request, response: Response): Promise<Response> {
    const importGrafoService = container.resolve(ImportGrafoService);

    const grafo = await importGrafoService.execute({
      filename: request.file.filename,
    });

    return response.json(grafo);
  }
}
