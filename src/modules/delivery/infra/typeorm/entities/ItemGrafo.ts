import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import VertexGrafo from './VertexGrafo';

@Entity('itemGrafo')
class ItemGrafo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => VertexGrafo, (vertex) => vertex.itemGrafo)
  vertexs: VertexGrafo[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ItemGrafo;
