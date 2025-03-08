/*
  Warnings:

  - You are about to drop the column `entreprenuerId` on the `bids` table. All the data in the column will be lost.
  - Added the required column `investorId` to the `bids` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_entreprenuerId_fkey";

-- AlterTable
ALTER TABLE "bids" DROP COLUMN "entreprenuerId",
ADD COLUMN     "investorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
