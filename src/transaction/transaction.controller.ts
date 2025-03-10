import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Create a new transaction' })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }
  
  @ApiOperation({ summary: 'Get all transactions' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a transaction by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }
  
  @ApiOperation({ summary: 'Delete a transaction by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
