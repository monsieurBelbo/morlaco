import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column()
  type: 'Adjustment' | 'Expense' | 'Income' | 'LoanGiven' | 'LoanReceived' | 'Transfer';

  @Column()
  date: Date;

  @ManyToOne(() => Account, account => account.transactions)
  account: Account;

  @ManyToOne(() => Account, { nullable: true })
  relatedAccount: Account;
}
