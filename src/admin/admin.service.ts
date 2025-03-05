import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AdminService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(createAdminDto: CreateAdminDto) {
        const { password, confirm_password, ...data } = createAdminDto;
        if (password != confirm_password) {
            throw new BadRequestException("Passwords did not match");
        }
        const activation_link = uuidv4();
        const hashed_password = await bcrypt.hash(password, 7);

        return this.prismaService.admin.create({
            data: { ...data, hashed_password, activation_link },
        });
    }

    findAll() {
        return this.prismaService.admin.findMany();
    }

    async findOne(id: number) {
        const admin = await this.prismaService.admin.findUnique({
            where: { id },
        });
        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }
        return admin;
    }

    async update(id: number, updateAdminDto: UpdateAdminDto) {
        await this.findOne(id);

        return this.prismaService.admin.update({
            where: { id },
            data: updateAdminDto,
        });
    }

    remove(id: number) {
        return this.prismaService.admin.delete({ where: { id } });
    }
}
