import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  title!: string;
  @Column()
  price!: number;
  @Column()
  description!: string;
  @Column()
  stock!: number;
  @Column()
  available!: boolean;
  @Column()
  onSale!: boolean;
  @Column()
  discount!: number;
  @ManyToOne(() => OrderEntity, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
