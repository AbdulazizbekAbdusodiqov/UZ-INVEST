/*
  Warnings:

  - Added the required column `project_presentation` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "project_presentation" TEXT NOT NULL;
