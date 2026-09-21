-- CreateTable
CREATE TABLE "TrainingRegistration" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "ageBracket" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "community" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "organization" TEXT,
    "experience" TEXT NOT NULL,
    "agriculturalArea" TEXT NOT NULL,
    "farmersReached" INTEGER,
    "challenges" TEXT,
    "agriTechnology" TEXT NOT NULL,
    "smartphoneType" TEXT NOT NULL,
    "interestAreas" TEXT[],
    "expectations" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrainingRegistration_email_idx" ON "TrainingRegistration"("email");

-- CreateIndex
CREATE INDEX "TrainingRegistration_lga_idx" ON "TrainingRegistration"("lga");

-- CreateIndex
CREATE INDEX "TrainingRegistration_gender_idx" ON "TrainingRegistration"("gender");

-- CreateIndex
CREATE INDEX "TrainingRegistration_smartphoneType_idx" ON "TrainingRegistration"("smartphoneType");

-- CreateIndex
CREATE INDEX "TrainingRegistration_createdAt_idx" ON "TrainingRegistration"("createdAt");
