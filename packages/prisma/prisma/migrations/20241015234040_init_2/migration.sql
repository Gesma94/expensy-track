/*
  Warnings:

  - You are about to drop the column `endDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `isRecurrentTemplate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `isRecurring` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "endDate",
DROP COLUMN "frequency",
DROP COLUMN "isRecurrentTemplate",
DROP COLUMN "isRecurring",
DROP COLUMN "startDate",
ADD COLUMN     "isTransfer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentTransactionId" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_parentTransactionId_fkey" FOREIGN KEY ("parentTransactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
