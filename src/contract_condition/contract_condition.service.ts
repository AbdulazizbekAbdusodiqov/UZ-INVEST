import { Injectable } from "@nestjs/common";
import { CreateContractConditionDto } from "./dto/create-contract_condition.dto";
import { UpdateContractConditionDto } from "./dto/update-contract_condition.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContractConditionService {
    constructor(private readonly prismaService: PrismaService) {}
    
    create(createContractConditionDto: CreateContractConditionDto) {
        return this.prismaService.contractCondition.create({
            data: createContractConditionDto,
        });
    }

    findAll() {
        return this.prismaService.contractCondition.findMany({include:{contract:true}});
    }

    findOne(id: number) {
        return this.prismaService.contractCondition.findUnique({
            where: { id },
            include:{contract:true}
        });
    }

    update(id: number, updateContractConditionDto: UpdateContractConditionDto) {
        return this.prismaService.contractCondition.update({
            where: { id },
            data: updateContractConditionDto,
            include:{contract:true}
        });
    }

    remove(id: number) {
        return this.prismaService.contractCondition.delete({
            where: { id },
        });
    }
}
