import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { UserRoles } from '../../users/types/userRoles.type';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  @Unique(['email'])
  email!: string;
  @Column({ select: false })
  password!: string;
  @Column({ type: 'enum', enum: UserRoles, nullable: false })
  role!: UserRoles;
  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
