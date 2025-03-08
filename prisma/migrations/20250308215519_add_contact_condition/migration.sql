-- CreateTable
CREATE TABLE "contract_condition" (
    "id" SERIAL NOT NULL,
    "contractId" INTEGER NOT NULL,
    "terminationFee" TEXT NOT NULL,
    "disputeResolution" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "penaltyTerms" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_condition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contract_condition" ADD CONSTRAINT "contract_condition_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
