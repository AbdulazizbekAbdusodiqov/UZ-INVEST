import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from '../users/dto/sign_in-user.dto';
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly userService: UsersService,
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        const condiate = await this.userService.findByEmail(createUserDto.email);
        if (condiate) {
            throw new BadRequestException("Bunday foydalanuvchi mavjud")
        }
        const newUser = await this.userService.create(createUserDto);
        const response = {
            message: "Tabriklayman tizimga qo'shildingin. Akkauntni faollastirish uchun emailingizga habar yubordik",
            userId: newUser.id
        }

        return response
    }

    async adminSignUp(createAdminDto: CreateAdminDto) {
        const condiate = await this.adminService.findByEmail(createAdminDto.email);
        if (condiate) {
            throw new BadRequestException("Bunday Admin mavjud")
        }
        const newAdmin = await this.adminService.create(createAdminDto);

        const response = {
            message: "Tabriklayman tizimga qo'shildingin. Akkauntni faollastirish uchun emailingizga habar yubordik",
            adminId: newAdmin.adminId
        }

        return response
    }


    async signIn(signInDto: SignInDto, res: Response) {

        const { email, password } = signInDto

        if (!email || !password) {
            throw new BadRequestException()
        }

        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Invalid Email or password')
        }
        if (!user.is_active) {
            throw new UnauthorizedException('user is not activate')
        }
        const validPassword = await bcrypt.compare(signInDto.password, user.hashed_password)
        if (!validPassword) {
            throw new UnauthorizedException('Invalid Email or password')
        }

        const tokens = await this.userService.getTokens(user);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

        const updateUser = await this.userService.updateRefreshToken(
            user.id,
            hashed_refresh_token
        )
        if (!updateUser) {
            throw new InternalServerErrorException("Tokenni saqlashda xatolik")
        }
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 100,
            httpOnly: true
        })
        const response = {
            message: "User logged in",
            userId: user.id,
            access_token: tokens.access_token
        };

        return response
    }

    async adminSignIn(signInDto: SignInDto, res: Response) {
        
        const { email, password } = signInDto

        if (!email || !password) {
            throw new BadRequestException()
        }

        const admin = await this.adminService.findByEmail(email)

        if (!admin) {
            throw new UnauthorizedException('Invalid Email or password')
        }
        // if (!admin.is_active) {
        //     throw new UnauthorizedException('admin is not activate')
        // }
        const validPassword = await bcrypt.compare(signInDto.password, admin.hashed_password)
        if (!validPassword) {
            throw new UnauthorizedException('Invalid Email or password')
        }

        const tokens = await this.adminService.getToken(admin);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

        const updateAdmin = await this.adminService.updateRefreshToken(
            admin.id,
            hashed_refresh_token
        )
        if (!updateAdmin) {
            throw new InternalServerErrorException("Tokenni saqlashda xatolik")
        }
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 100,
            httpOnly: true
        })
        const response = {
            message: "Admin logged in",
            adminId: admin.id,
            access_token: tokens.access_token
        };

        return response
    }
    async signOut(refreshToken : string, res: Response){
        const userData =await this.jwtService.verify(refreshToken,{
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        if(!userData){
            throw new ForbiddenException("User not verified")
        }
        const hashed_refresh_token = null;
        await this.userService.updateRefreshToken(
            userData.id,
            hashed_refresh_token
        )

        res.clearCookie("refresh_token");

        const response = {
            message:"User logged out successfully"
        }
        return response
    }
    
    async refreshToken(userId:number, refreshToken : string, res: Response){
        const decodedToken = await this.jwtService.decode(refreshToken);

        if(userId != decodedToken["id"]){
            throw new BadRequestException("Ruxsat etilmagan");
        }
        
        const user = await this.userService.findOne(userId)
        if(!user || !user.hashed_refresh_token){
            throw new BadRequestException("user not found");
        }

        const tokenMatch = await bcrypt.compare(
            refreshToken,
            user.hashed_refresh_token
        )

        if(!tokenMatch){
            throw new ForbiddenException("Forbidden")
        }

        const tokens = await this.userService.getTokens(user)

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

        await this.userService.updateRefreshToken(user.id, hashed_refresh_token);

        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15*24-60*1000,
            httpOnly:true
        })
        const response = {
            message:"User refreshed",
            user: user.id,
            access_token : tokens.access_token
        }
        return response
    }
}
