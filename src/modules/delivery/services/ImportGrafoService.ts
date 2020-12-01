import path from 'path';
import fs from 'fs';
import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ItemGrafo from '@modules/delivery/infra/typeorm/entities/ItemGrafo';
import Order from '@modules/delivery/infra/typeorm/entities/Order';
import IGrafoRepository from '../repositories/IGrafoRepository';
import CreateOrderService from './CreateOrderService';
import CreateItemGrafoService from './CreateItemGrafoService';
import CreateVertexGrafoService from './CreateVertexGrafoService';
import ExecuteA1Service from './ExecuteA1Service';
import ExecuteA2Service from './ExecuteA2Service';

interface ICSVItem {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

interface IRequest {
  filename: string;
}

interface IResponse {
  itemGrafo: ItemGrafo[];
  order: Order[];
}

@injectable()
class ImportTransactionsService {
  constructor(
    @inject('GrafoRepository')
    private grafoRepository: IGrafoRepository,
  ) {}

  async execute({ filename }: IRequest): Promise<IResponse> {
    const createOrderService = container.resolve(CreateOrderService);
    const createItemGrafoService = container.resolve(CreateItemGrafoService);
    const createVertexGrafoService = container.resolve(
      CreateVertexGrafoService,
    );
    const executeA1Service = container.resolve(ExecuteA1Service);
    const executeA2Service = container.resolve(ExecuteA2Service);

    const filepath = path.join(uploadConfig.tmpFolder, filename);
    let newItensGrafoArr: ItemGrafo[] = [];
    const newOrderssArr: Order[] = [];

    const data = fs
      .readFileSync(filepath)
      .toString() // convert Buffer to string
      .split('\n') // split string to lines
      .map((e) => e.trim()) // remove white spaces for each line
      .map((e) => e.split(',').map((ed) => ed.trim())); // split each line to array

    const number_items_grafo = data[0][0];
    const number_items_grafo_float = parseFloat(number_items_grafo);
    if (isNaN(number_items_grafo_float) || number_items_grafo_float < 0) {
      throw new AppError('Number error');
    }

    const number_delivery = data[number_items_grafo_float + 2][0];
    const number_delivery_float = parseFloat(number_delivery);
    if (isNaN(number_delivery_float) || number_items_grafo_float < 0) {
      throw new AppError('Number error');
    }

    const number_delivery_limit = number_delivery_float + 1;
    const number_items_grafo_limit = parseFloat(number_items_grafo) + 1;

    const header = data[1];
    const promises = header.map(async (graf) => {
      const grafoFind = await this.grafoRepository.findByName(graf);
      if (grafoFind) {
        throw new AppError('Item Grafo already exists');
      }

      const grafo = await createItemGrafoService.execute({ name: graf });
      newItensGrafoArr.push(grafo);
    });

    await Promise.all(promises);

    if (!newItensGrafoArr) {
      throw new AppError('Not can save in the BD.');
    }

    for (let i = 2; i <= number_items_grafo_limit; i++) {
      const element = data[i];

      for (let y = 0; y <= element.length - 1; y++) {
        const value = parseFloat(element[y]);

        if (isNaN(value)) {
          throw new AppError('Number error');
        }

        if (value > 0) {
          const main_name = header[y];
          const second_name = header[i - 2];

          const item = await newItensGrafoArr.filter((graf) => {
            return graf.name === main_name;
          });

          const seconde_item = await newItensGrafoArr.filter((graf) => {
            return graf.name === second_name;
          });

          await createVertexGrafoService.execute({
            value,
            itemGrafo_id: item[0].id,
            itemGrafo_second_id: seconde_item[0].id,
          });
        }
      }
    }

    for (let i = 2; i <= number_delivery_limit; i++) {
      const ind = number_items_grafo_limit + i;
      const element = data[ind];

      const main_name = element[1];
      const value1 = parseFloat(element[0]);
      const value2 = parseFloat(element[2]);

      const item = await newItensGrafoArr.filter((graf) => {
        return graf.name === main_name;
      });

      const order = await createOrderService.execute({
        time: value1,
        value: value2,
        itemGrafo_id: item[0].id,
      });

      newOrderssArr.push(order);
    }

    await executeA1Service.execute();
    await executeA2Service.execute();

    const findGrafo = await this.grafoRepository.findAll();

    newItensGrafoArr = findGrafo!;

    const fileExists = await fs.promises.stat(filepath);

    if (fileExists) {
      await fs.promises.unlink(filepath);
    }

    return { itemGrafo: newItensGrafoArr, order: newOrderssArr };
  }
}

export default ImportTransactionsService;
