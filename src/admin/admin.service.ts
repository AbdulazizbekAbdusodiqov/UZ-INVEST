import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AdminService {
  async create(createAdminDto: CreateAdminDto) {
    
    if(createAdminDto.password !== createAdminDto.confirm_password){
      throw new BadRequestException("parol mos kelmadi")
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)
    

    return 
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
 