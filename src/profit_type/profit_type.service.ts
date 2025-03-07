import { Injectable } from '@nestjs/common';
import { CreateProfitTypeDto } from './dto/create-profit_type.dto';
import { UpdateProfitTypeDto } from './dto/update-profit_type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfitTypeService {
  constructor(private readonly prismaService: PrismaService) {}
  
  create(createProfitTypeDto: CreateProfitTypeDto) {
    return this.prismaService.profitType.create({ data: createProfitTypeDto });
  }

  findAll() {
    return this.prismaService.profitType.findMany();
  }

  findOne(id: number) {
    return this.prismaService.profitType.findUnique({ where: { id } });
  }

  update(id: number, updateProfitTypeDto: UpdateProfitTypeDto) {
    return this.prismaService.profitType.update({
      where: { id },
      data: updateProfitTypeDto,
    });
  }

  remove(id: number) {
    return this.prismaService.profitType.delete({ where: { id } });
  }
}
