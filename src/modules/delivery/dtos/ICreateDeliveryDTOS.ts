export default interface ICreateDeliveryDTOS {
  order_id: string;
  type: 'Income' | 'Outcome';
  seq: number;
  exec: string;
}
