import IGrafoRepository from '@modules/delivery/repositories/IGrafoRepository';
// import ICreateUserDTOS from '@modules/users/dtos/ICreateUserDTOS';

import ItemGrafo from '../entities/ItemGrafo';

class GrafoRespository implements IGrafoRepository {
  private itensGrafo: ItemGrafo[] = [];

  public async create(data: ItemGrafo): Promise<ItemGrafo> {
    const itemGrafo = new ItemGrafo();

    Object.assign(itemGrafo, data);

    this.itensGrafo.push(itemGrafo);

    return itemGrafo;
  }

  public async findByName(name: string): Promise<ItemGrafo | undefined> {
    const findItemGrafo = this.itensGrafo.find(
      (itemGrafo) => itemGrafo.name === name,
    );

    return findItemGrafo;
  }
}

export default GrafoRespository;
