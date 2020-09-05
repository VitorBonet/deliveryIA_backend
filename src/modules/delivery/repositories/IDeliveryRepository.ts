import Delivery from '../infra/entities/Delivery';
// import ICreateUserDTOS from '../dtos/ICreateUserDTOS';
// import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IDeliveryRepository {
  create(data: Delivery): Promise<Delivery>;
}
