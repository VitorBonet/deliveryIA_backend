import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrderService from '@modules/delivery/services/ListOrderService';

export default class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listOrderService = container.resolve(ListOrderService);

    const orders = await listOrderService.show();

    return response.json(orders);
  }
}
