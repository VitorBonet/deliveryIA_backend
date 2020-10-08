import ItemGrafo from '../infra/typeorm/entities/ItemGrafo';
import ICreateItemGrafoDTOS from '../dtos/ICreateItemGrafoDTOS';

export default interface IGrafoRepository {
  create(data: ICreateItemGrafoDTOS): Promise<ItemGrafo>;
  findById(id: string): Promise<ItemGrafo | undefined>;
  findByName(name: string): Promise<ItemGrafo | undefined>;
  findAll(): Promise<ItemGrafo[] | undefined>;
}
