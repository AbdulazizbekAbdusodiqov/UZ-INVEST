/*
  Warnings:

  - Added the required column `projectTypeId` to the `invesment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invesment" ADD COLUMN     "projectTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "invesment" ADD CONSTRAINT "invesment_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "project_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
