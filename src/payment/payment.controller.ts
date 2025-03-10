import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create a new payment' })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }
  
  @ApiOperation({ summary: 'Get all payments' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a payment by ID' })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a payment by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }
  
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
