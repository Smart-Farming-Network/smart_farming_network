-- CreateEnum
CREATE TYPE "public"."VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "documents" JSONB,
ADD COLUMN     "roleSpecific" JSONB;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "profileCompletionPct" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profileStage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "requestedRole" "public"."Role",
ADD COLUMN     "verificationStatus" "public"."VerificationStatus" NOT NULL DEFAULT 'PENDING';
