import ItemGrafo from '../infra/entities/ItemGrafo';
// import ICreateUserDTOS from '../dtos/ICreateUserDTOS';
// import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IGrafoRepository {
  create(data: ItemGrafo): Promise<ItemGrafo>;
  findByName(name: string): Promise<ItemGrafo | undefined>;
}
