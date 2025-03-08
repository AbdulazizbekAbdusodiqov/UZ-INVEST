import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createPaymentDto: CreatePaymentDto) {
    return await this.prismaService.payment.create({ data: createPaymentDto });
  }

  async findAll() {
    return await this.prismaService.payment.findMany({include:{contaract:true}});
  }

  async findOne(id: number) {
    return await this.prismaService.payment.findUnique({ where: { id },include:{contaract:true}});
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.prismaService.payment.update({
      where: { id },
      data: updatePaymentDto,
      include:{contaract:true}
    });
  }

  async remove(id: number) {
    return await this.prismaService.payment.delete({ where: { id } });
  }
}
