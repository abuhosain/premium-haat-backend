/*
  Warnings:

  - You are about to drop the column `txId` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `txId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "txId";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "txId" TEXT NOT NULL;
