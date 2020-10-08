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

@Entity('order')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  time: number;

  @Column()
  itemGrafo_id: string;

  @ManyToOne(() => ItemGrafo)
  @JoinColumn({ name: 'itemGrafo_id' })
  itemGrafo: ItemGrafo;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
