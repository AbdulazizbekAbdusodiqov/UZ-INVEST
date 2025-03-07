-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "entreprenuerId" INTEGER NOT NULL,
    "project_typeId" INTEGER NOT NULL,
    "budged" DOUBLE PRECISION NOT NULL,
    "project_plan" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_entreprenuerId_fkey" FOREIGN KEY ("entreprenuerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_project_typeId_fkey" FOREIGN KEY ("project_typeId") REFERENCES "project_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
