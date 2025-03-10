import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: 'Create a new payment method' })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }
  
  @ApiOperation({ summary: 'Get all payment methods' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a payment method by ID' })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a payment method by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(+id, updatePaymentMethodDto);
  }
  
  @ApiOperation({ summary: 'Delete a payment method by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
  
}
