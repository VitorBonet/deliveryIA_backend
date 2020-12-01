import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDeliveryService from '@modules/delivery/services/ListDeliveryService';

export default class DeliveryController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { exec } = request.query;
    const listDeliveryService = container.resolve(ListDeliveryService);

    const deliverys = await listDeliveryService.show(exec);

    return response.json(deliverys);
  }
}
