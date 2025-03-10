/*
  Warnings:

  - You are about to drop the column `neme` on the `project_type` table. All the data in the column will be lost.
  - Added the required column `name` to the `project_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "is_creator" SET DEFAULT false;

-- AlterTable
ALTER TABLE "project_type" DROP COLUMN "neme",
ADD COLUMN     "name" TEXT NOT NULL;
