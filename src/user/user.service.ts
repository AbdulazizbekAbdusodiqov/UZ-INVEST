import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

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

    findOne(id: number) {
        return this.prismaService.user.findUnique({ where: { id } });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const { role, ...data } = updateUserDto;
        return this.prismaService.user.update({
            where: { id },
            data: { ...data, role: String(role) },
        });
    }

    remove(id: number) {
        return this.prismaService.user.delete({where:{id}})
    }
}
