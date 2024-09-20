import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: any) {
    return this.accountsService.create(createAccountDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Get(':id/balance')
  getBalance(@Param('id') id: string) {
    return this.accountsService.getBalance(+id);
  }
}
