-- AlterTable
ALTER TABLE "user" ADD COLUMN     "countryId" INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
