/*
  Warnings:

  - A unique constraint covering the columns `[activation_link]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_activation_link_key" ON "admin"("activation_link");
