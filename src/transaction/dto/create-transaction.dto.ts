enum Status {
    PENDING="PENDING",
    COMPLETED="COMPLETED",
    FAILED="FAILED"
}

enum Type {
    INVESTMENT="INVESTMENT",
    PROFIT="PROFIT",
    PAYMENT="PAYMENT",
}
export class CreateTransactionDto {
    contractId: number;
    receiverId: number;
    senderID: number;
    amount: number;
    type: Type;
    status: Status;
    paymentMethodId: number;
}
