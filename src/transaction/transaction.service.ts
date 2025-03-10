import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService){}
  
  create(createTransactionDto: CreateTransactionDto) {
    return this.prismaService.transaction.create({ data: createTransactionDto });
  }

  findAll() {
    return this.prismaService.transaction.findMany({include:{contarct:true,paymnetMethod:true}});
  }

  findOne(id: number) {
    return this.prismaService.transaction.findUnique({ where: { id } });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.prismaService.transaction.delete({ where: { id } });
  }
}
