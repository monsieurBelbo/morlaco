import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  currency: string;

  @Column('decimal')
  initialBalance: number;

  @Column()
  type: string;

  @Column()
  isOwn: boolean;

  @ManyToOne(() => Project, project => project.accounts)
  project: Project;

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions: Transaction[];
}
