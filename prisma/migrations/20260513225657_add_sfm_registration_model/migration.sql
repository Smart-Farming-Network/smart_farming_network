-- CreateEnum
CREATE TYPE "TicketTier" AS ENUM ('STARTER', 'PROFESSIONAL', 'ADVANCED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateTable
CREATE TABLE "SFMRegistration" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "tier" "TicketTier" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "transactionId" TEXT,
    "gatewayResponse" TEXT,
    "paymentChannel" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SFMRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SFMRegistration_reference_key" ON "SFMRegistration"("reference");

-- CreateIndex
CREATE INDEX "SFMRegistration_email_idx" ON "SFMRegistration"("email");

-- CreateIndex
CREATE INDEX "SFMRegistration_reference_idx" ON "SFMRegistration"("reference");

-- CreateIndex
CREATE INDEX "SFMRegistration_paymentStatus_idx" ON "SFMRegistration"("paymentStatus");

-- AddForeignKey
ALTER TABLE "SFMRegistration" ADD CONSTRAINT "SFMRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
