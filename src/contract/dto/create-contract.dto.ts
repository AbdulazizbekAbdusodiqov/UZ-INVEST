enum status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export class CreateContractDto {
    investorId: number;
    entrepreneurId: number;
    projectId: number;
    bidId: number;
    amount: number;
    status: status;
    startDate: Date;
    endDate: Date;
    profitTypeId: number;
    profitValue: number;
    dividend_period?: string;
    ownership_percentage?: number;
}
