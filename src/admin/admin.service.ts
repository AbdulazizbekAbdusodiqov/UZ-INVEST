import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as uuid from 'uuid'
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) { }

  async create(createAdminDto: CreateAdminDto) {

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("parol mos kelmadi")
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)
    const activation_link = await uuid.v4()

    const admin = await this.adminModel.create({ ...createAdminDto, hashed_password, activation_link, hashed_refresh_token: '' })
    const tokens = await this.getToken(admin)
    admin.hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    await admin.save()

    try {
      await this.mailService.sendMail(admin);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xabar yuborishda xatolik")
    }

    const response = {
      message: "admin created",
      adminId: admin.id,
      access_token: tokens.access_token
    }

    return response
  }

  findAll() {
    return this.adminModel.findAll()
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id)
  }

  findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }
  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token },
      {
        where: { id }
      }
    );

    return updatedAdmin
  }
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.update(updateAdminDto, {
      where:{id},
      returning : true
    })[1][0]
    return admin
  }

  remove(id: number) {
    return this.adminModel.destroy({where:{id}})
  }
  async getToken(admin: Admin) {
    const payload = {
      id: admin.id,
      role: "admin",
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
  async activate(link: string) {

    if (!link) {
      throw new BadRequestException("Activation link not found")
    }
    const updateAdmin = await this.adminModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false
        },
        returning: true
      },
    )

    if (!updateAdmin[1][0]) {
      throw new BadRequestException("User already activates")
    }
    const response = {
      message: "User activated successfully",
      is_active: updateAdmin[1][0].is_active
    }

    return response
  }
}
