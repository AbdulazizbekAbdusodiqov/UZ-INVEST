import { Injectable } from "@nestjs/common";
import { CreateInvesmentDto } from "./dto/create-invesment.dto";
import { UpdateInvesmentDto } from "./dto/update-invesment.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InvesmentService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createInvesmentDto: CreateInvesmentDto) {
        return this.prismaService.invesment.create({
            data: createInvesmentDto,
        });
    }

    findAll() {
        return this.prismaService.invesment.findMany({
            include: {
                investor: {
                    omit: {
                        first_name: true,
                        last_name: true,
                        email: true,
                        tg_link: true,
                        is_active: true,
                    },
                },
                projectType: true,
            },
        });
    }

    findOne(id: number) {
        return this.prismaService.invesment.findUnique({
            where: { id },
            include: {
                investor: {
                    omit: {
                        first_name: true,
                        last_name: true,
                        email: true,
                        tg_link: true,
                        is_active: true,
                    },
                },
                projectType: true,
            },
        });
    }

    update(id: number, updateInvesmentDto: UpdateInvesmentDto) {
        return this.prismaService.invesment.update({
            where: { id },
            data: updateInvesmentDto,
        });
    }

    remove(id: number) {
        return this.prismaService.invesment.delete({ where: { id } });
    }
}
