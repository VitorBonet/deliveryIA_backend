import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import ItemGrafo from './ItemGrafo';

@Entity('vertexGrafo')
class VertexGrafo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemGrafo_id: string;

  @ManyToOne(() => ItemGrafo)
  @JoinColumn({ name: 'itemGrafo_id' })
  itemGrafo: ItemGrafo;

  @Column()
  itemGrafo_second_id: string;

  @ManyToOne(() => ItemGrafo)
  @JoinColumn({ name: 'itemGrafo_second_id' })
  itemGrafo_second: ItemGrafo;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default VertexGrafo;
