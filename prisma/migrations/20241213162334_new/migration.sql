/*
  Warnings:

  - A unique constraint covering the columns `[txId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[txId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_txId_key" ON "orders"("txId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_txId_key" ON "payments"("txId");
