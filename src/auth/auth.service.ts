import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, UserSignInDto } from "../user/dto";
import { ResponseFields } from "../types";
import { Response } from "express";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {}
    async signUp(createUserDto: CreateUserDto) {
        const condiate = await this.userService.findByEmail(
            createUserDto.email
        );
        if (condiate) {
            throw new BadRequestException("Such a user exists");
        }
        const newUser = await this.userService.create(createUserDto);

        const response = {
            message: "Congratulations, you have joined the system",
            userId: newUser.id,
        };

        return response;
    }

    async signIn(userSignInDto: UserSignInDto, res: Response):Promise<ResponseFields> {
        const { email, password } = userSignInDto;

        if (!email || !password) {
            throw new BadRequestException();
        }

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Invalid Email or password");
        }
        if(user.role != userSignInDto.role){
            throw new UnauthorizedException("Invalid Email or password");
        }
        const validPassword = await bcrypt.compare(
            userSignInDto.password,
            user.hashed_password
        );
        if (!validPassword) {
            throw new UnauthorizedException("Invalid Email or password");
        }

        const tokens = await this.userService.getTokens(user);

        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

        const updateUser = await this.userService.updateRefreshToken(
            user.id,
            hashed_refresh_token
        );
        if (!updateUser) {
            throw new InternalServerErrorException("Error saving token");
        }
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });
        const response = {
            id: user.id,
            access_token: tokens.access_token,
        };

        return response;
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

    async refreshToken(userId:number, refreshToken : string, res: Response): Promise<ResponseFields>{
        const decodedToken = await this.jwtService.decode(refreshToken);

        if(userId != decodedToken["id"]){
            throw new BadRequestException("Not allowed");
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
            maxAge: +process.env.COOKIE_TIME!,
            httpOnly:true
        })
        const response = {
            id: user.id,
            access_token : tokens.access_token
        }
        return response
    }
}
