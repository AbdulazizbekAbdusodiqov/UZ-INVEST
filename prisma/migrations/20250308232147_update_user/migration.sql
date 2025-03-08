/*
  Warnings:

  - A unique constraint covering the columns `[activation_link]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_activation_link_key" ON "user"("activation_link");
