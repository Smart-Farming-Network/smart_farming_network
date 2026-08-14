-- CreateEnum
CREATE TYPE "ServicePaymentStatus" AS ENUM ('PENDING', 'RECEIPT_SUBMITTED', 'VERIFIED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "service_payments" (
    "id" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "serviceSlug" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "status" "ServicePaymentStatus" NOT NULL DEFAULT 'PENDING',
    "receiptSent" BOOLEAN NOT NULL DEFAULT false,
    "receiptSentAt" TIMESTAMP(3),
    "whatsappNumber" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_payments_reference_key" ON "service_payments"("reference");

-- CreateIndex
CREATE INDEX "service_payments_customerEmail_idx" ON "service_payments"("customerEmail");

-- CreateIndex
CREATE INDEX "service_payments_customerPhone_idx" ON "service_payments"("customerPhone");

-- CreateIndex
CREATE INDEX "service_payments_status_idx" ON "service_payments"("status");

-- CreateIndex
CREATE INDEX "service_payments_service_idx" ON "service_payments"("service");

-- CreateIndex
CREATE INDEX "service_payments_createdAt_idx" ON "service_payments"("createdAt");
