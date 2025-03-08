import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BidsService {
  constructor(private readonly prismaService: PrismaService){}
  
  create(createBidDto: CreateBidDto) {
    return this.prismaService.bids.create({ data: createBidDto });
  }

  findAll() {
    return this.prismaService.bids.findMany();
  }

  findOne(id: number) {
    return this.prismaService.bids.findUnique({ where: { id } });
  }

  update(id: number, updateBidDto: UpdateBidDto) {
    return this.prismaService.bids.update({ where: { id }, data: updateBidDto });
  }

  remove(id: number) {
    return this.prismaService.bids.delete({ where: { id } });
  }
}
