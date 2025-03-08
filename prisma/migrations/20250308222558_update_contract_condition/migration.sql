/*
  Warnings:

  - A unique constraint covering the columns `[contractId]` on the table `contract_condition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contract_condition_contractId_key" ON "contract_condition"("contractId");
