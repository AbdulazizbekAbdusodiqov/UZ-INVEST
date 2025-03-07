import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { Tokens } from "../types";
import { CreateUserDto, Role, UpdateUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { password, confirm_password, role, ...data } = createUserDto;
        if (password != confirm_password) {
            throw new BadRequestException("Passwords did not match");
        }
        const activation_link = uuidv4();
        const hashed_password = await bcrypt.hash(password, 7);

        return this.prismaService.user.create({
            data: {
                ...data,
                hashed_password,
                activation_link,
                role: String(role),
            },
        });
    }

    findAll() {
        return this.prismaService.user.findMany();
    }
    findAllInvestor() {
        return this.prismaService.user.findMany({where:{role:"INVESTOR"}, include:{Invesment:true}});
    }
    findAllEntrepreneur() {
        return this.prismaService.user.findMany({where:{role:"ENTREPRENEUR"}});
    }

    findOne(id: number) {
        return this.prismaService.user.findUnique({ where: { id:+id } });
    }
    async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        return user;
    }
    update(id: number, updateUserDto: UpdateUserDto) {
        return this.prismaService.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    remove(id: number) {
        return this.prismaService.user.delete({ where: { id } });
    }

    async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: { hashed_refresh_token },
        });

        return updatedUser;
    }

    async getTokens(user: User): Promise<Tokens> {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}
