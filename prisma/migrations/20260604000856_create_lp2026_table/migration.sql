-- CreateTable
CREATE TABLE "LP2026Registration" (
    "id" TEXT NOT NULL,
    "applicationNumber" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL,
    "financialCapacity" TEXT NOT NULL,
    "strategicVision" TEXT NOT NULL,
    "engagementTimeline" TEXT NOT NULL,
    "referralSource" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LP2026Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LP2026Registration_applicationNumber_key" ON "LP2026Registration"("applicationNumber");
