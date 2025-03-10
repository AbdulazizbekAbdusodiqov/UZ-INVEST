/*
  Warnings:

  - You are about to drop the column `senderID` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_senderID_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "senderID",
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
