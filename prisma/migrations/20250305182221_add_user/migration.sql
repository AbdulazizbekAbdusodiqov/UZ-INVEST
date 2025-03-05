/*
  Warnings:

  - You are about to drop the column `is_owner` on the `admin` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INVESTOR', 'ENTREPRENEUR');

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "is_owner",
ADD COLUMN     "is_creator" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "is_active" SET DEFAULT true;

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "tg_link" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "activation_link" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "hashed_refresh_token" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
