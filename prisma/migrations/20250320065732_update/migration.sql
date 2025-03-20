-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_countryId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "tg_link" DROP NOT NULL,
ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
