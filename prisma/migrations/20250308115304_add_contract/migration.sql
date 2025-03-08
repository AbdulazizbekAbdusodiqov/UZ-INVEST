-- CreateTable
CREATE TABLE "contract" (
    "id" SERIAL NOT NULL,
    "investorId" INTEGER NOT NULL,
    "entrepreneurId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "bidId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "profitTypeId" INTEGER NOT NULL,
    "profitValue" DOUBLE PRECISION NOT NULL,
    "dividend_period" TEXT,
    "ownership_percentage" DOUBLE PRECISION,
    "condation_file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_entrepreneurId_fkey" FOREIGN KEY ("entrepreneurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_profitTypeId_fkey" FOREIGN KEY ("profitTypeId") REFERENCES "profit_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
