import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCountryDto: CreateCountryDto) {
    return await this.prismaService.country.create({ data: createCountryDto });
  }

  async findAll() {
    return await this.prismaService.country.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.country.findUnique({ where: { id } });
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    return await this.prismaService.country.update({
      where: { id },
      data: updateCountryDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.country.delete({ where: { id } });
  }
}
