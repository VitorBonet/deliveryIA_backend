import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import ItemGrafo from '@modules/delivery/infra/entities/ItemGrafo';
import IGrafoRepository from '../repositories/IGrafoRepository';

interface CSVItem {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

interface Request {
  filename: string;
}

@injectable()
class ImportTransactionsService {
  constructor(
    @inject('GrafoRepository')
    private grafoRepository: IGrafoRepository,
  ) {}

  async execute({ filename }: Request): Promise<ItemGrafo[]> {
    const filepath = path.join(uploadConfig.tmpFolder, filename);
    const newItensGrafoArr: ItemGrafo[] = [];

    const jsonCSV = await csv({ trim: true }).fromFile(filepath);

    await jsonCSV.map(async (row) => {
      // verificar como será o CVS para inclusão
      // if (!row.title || !row.type || !row.value || !row.category) {
      //   throw new Error('File is not compatible with database.');
      // }
      // categoriesArr.push(row.category);
      // transactionsArr.push({
      //   title: row.title,
      //   type: row.type,
      //   value: row.value,
      //   category: row.category,
      // });
    });

    const fileExists = await fs.promises.stat(filepath);

    if (fileExists) {
      await fs.promises.unlink(filepath);
    }

    return newItensGrafoArr;
  }
}

export default ImportTransactionsService;
