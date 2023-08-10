import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  firstName!: string;
  @Column()
  lastName!: string;
  @Column()
  address!: string;
  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders?: OrderEntity[];
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
