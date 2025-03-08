-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "contractId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
