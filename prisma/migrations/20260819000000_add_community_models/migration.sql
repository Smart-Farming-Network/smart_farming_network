-- CreateEnum
CREATE TYPE "CommunityCategory" AS ENUM ('QUESTION', 'EXPERIENCE', 'CHALLENGE', 'TIP', 'MARKET');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('VISIBLE', 'FLAGGED', 'HIDDEN');

-- CreateTable
CREATE TABLE "CommunityPost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "category" "CommunityCategory" NOT NULL,
    "content" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "tags" TEXT[],
    "image" TEXT,
    "imageId" TEXT,
    "status" "ModerationStatus" NOT NULL DEFAULT 'VISIBLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "ModerationStatus" NOT NULL DEFAULT 'VISIBLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPostLike" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityPostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPostSave" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityPostSave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityReport" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "postId" TEXT,
    "commentId" TEXT,
    "reason" TEXT NOT NULL,
    "note" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommunityPost_status_createdAt_idx" ON "CommunityPost"("status", "createdAt");

-- CreateIndex
CREATE INDEX "CommunityPost_category_idx" ON "CommunityPost"("category");

-- CreateIndex
CREATE INDEX "CommunityPost_authorId_idx" ON "CommunityPost"("authorId");

-- CreateIndex
CREATE INDEX "CommunityComment_postId_createdAt_idx" ON "CommunityComment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "CommunityComment_authorId_idx" ON "CommunityComment"("authorId");

-- CreateIndex
CREATE INDEX "CommunityPostLike_userId_idx" ON "CommunityPostLike"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityPostLike_postId_userId_key" ON "CommunityPostLike"("postId", "userId");

-- CreateIndex
CREATE INDEX "CommunityPostSave_userId_idx" ON "CommunityPostSave"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityPostSave_postId_userId_key" ON "CommunityPostSave"("postId", "userId");

-- CreateIndex
CREATE INDEX "CommunityReport_postId_idx" ON "CommunityReport"("postId");

-- CreateIndex
CREATE INDEX "CommunityReport_commentId_idx" ON "CommunityReport"("commentId");

-- CreateIndex
CREATE INDEX "CommunityReport_resolvedAt_idx" ON "CommunityReport"("resolvedAt");

-- AddForeignKey
ALTER TABLE "CommunityPost" ADD CONSTRAINT "CommunityPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostLike" ADD CONSTRAINT "CommunityPostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostLike" ADD CONSTRAINT "CommunityPostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostSave" ADD CONSTRAINT "CommunityPostSave_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostSave" ADD CONSTRAINT "CommunityPostSave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityReport" ADD CONSTRAINT "CommunityReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityReport" ADD CONSTRAINT "CommunityReport_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityReport" ADD CONSTRAINT "CommunityReport_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "CommunityComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

