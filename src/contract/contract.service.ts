import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AwsFileService } from "../upload/aws_upload.service";
import { Role } from "../user/dto";

@Injectable()
export class ContractService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly awsFileService: AwsFileService
    ) {}
    async create(createContractDto: CreateContractDto, condation_file: any) {
        try {
            console.log(createContractDto);
            
            const {
                investorId,
                projectId,
                entrepreneurId,
                profitTypeId,
                bidId,
                amount,
                profitValue,
                ownership_percentage,
                startDate,
                endDate,
                ...data
            } = createContractDto;

            const entrepreneurExists = await this.prismaService.user.findUnique({
                where: { id: +entrepreneurId, role: Role.ENTREPRENEUR },
            });

            if (!entrepreneurExists) {
                throw new BadRequestException('Entrepreneur does not exist');
            }
            let resultCondationFile: any;
            resultCondationFile = await this.awsFileService.uploadFile(condation_file);

            if (!resultCondationFile) {
                throw new BadRequestException('File upload failed');
            }

            return this.prismaService.contract.create({
                data: {
                    ...data,
                    investorId: +investorId,
                    projectId: +projectId,
                    entrepreneurId: +entrepreneurId,
                    profitTypeId: +profitTypeId,
                    bidId: +bidId,
                    amount: +amount,
                    profitValue: +profitValue,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    ownership_percentage: Number(ownership_percentage),
                    condation_file: resultCondationFile?.Location,
                },
            });
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Bad Request');
        }
    }

    async findAll() {
        return await this.prismaService.contract.findMany({include:{bid:true, entrepreneur:true, investor:true,project:true, contractCondition:true, profitType:true}});
    }

    async findOne(id: number) {
        return await this.prismaService.contract.findUnique({ where: { id } });
    }

    async update(id: number, updateContractDto: UpdateContractDto) {
        return await this.prismaService.contract.update({
            where: { id },
            data: updateContractDto,
        });
    }

    async remove(id: number) {
        return await this.prismaService.contract.delete({ where: { id } });
    }
}
