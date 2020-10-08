import VertexGrafo from '../infra/typeorm/entities/VertexGrafo';
import ICreateVertexGrafoDTOS from '../dtos/ICreateVertexGrafoDTOS';

export default interface IVertexGrafoRepository {
  create(data: ICreateVertexGrafoDTOS): Promise<VertexGrafo>;
}
