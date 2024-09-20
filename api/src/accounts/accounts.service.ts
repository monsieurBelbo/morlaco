import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    let account: Account = this.accountRepository.create(createAccountDto)
    return await this.accountRepository.save(account);
  }

  async findOne(id: number): Promise<Account> {
    return await this.accountRepository.findOne({ where: { id } });
  }

  async getBalance(id: number): Promise<number> {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['transactions'],
    });

    if (!account) {
      throw new Error('Account not found');
    }

    const initialBalance = account.initialBalance;
    const transactionsSum = account.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'Income' || transaction.type === 'LoanReceived') {
        return sum + transaction.amount;
      } else if (transaction.type === 'Expense' || transaction.type === 'LoanGiven') {
        return sum - transaction.amount;
      }
      return sum;
    }, 0);

    return initialBalance + transactionsSum;
  }
}
