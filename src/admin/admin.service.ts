import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as uuid from 'uuid'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly jwtService: JwtService
  ) { }

  async create(createAdminDto: CreateAdminDto) {

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("parol mos kelmadi")
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)
    const activation_link = uuid.v4()


    const admin = await this.adminModel.create({ ...createAdminDto, hashed_password, activation_link, hashed_refresh_token: '' })
    const tokens = await this.getToken(admin)
    admin.hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    await admin.save()

    const response = {
      message: "admin created",
      adminId: admin.id,
      access_token: tokens.access_token
    }

    return response
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
  async getToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      email: admin.email
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }
}
