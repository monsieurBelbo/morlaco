import { IsNumber, IsEnum, IsDate } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsEnum(['Adjustment', 'Expense', 'Income', 'LoanGiven', 'LoanReceived', 'Transfer'])
  type: 'Adjustment' | 'Expense' | 'Income' | 'LoanGiven' | 'LoanReceived' | 'Transfer';

  @IsDate()
  date: Date;
}
