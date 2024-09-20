import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Account } from '../accounts/account.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'Personal' | 'Business';

  @ManyToOne(() => User, user => user.projects)
  user: User;

  @OneToMany(() => Account, account => account.project)
  accounts: Account[];
}
