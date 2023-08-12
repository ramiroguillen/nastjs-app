import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { UserRoles } from '../../user/types/userRoles.type';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  @Unique(['email'])
  email!: string;
  @Column()
  password!: string;
  @Column({ type: 'enum', enum: UserRoles, nullable: false })
  role!: UserRoles;
  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: Relation<CustomerEntity>;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
