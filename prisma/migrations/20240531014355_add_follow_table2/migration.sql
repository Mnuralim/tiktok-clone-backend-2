/*
  Warnings:

  - You are about to drop the column `userId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Following` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followesId` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingsId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_userId_fkey";

-- DropIndex
DROP INDEX "Follower_userId_key";

-- DropIndex
DROP INDEX "Following_userId_key";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "userId",
ADD COLUMN     "followerId" TEXT NOT NULL,
ADD COLUMN     "followesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" DROP COLUMN "userId",
ADD COLUMN     "followingId" TEXT NOT NULL,
ADD COLUMN     "followingsId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Follower_followesId_followerId_idx" ON "Follower"("followesId", "followerId");

-- CreateIndex
CREATE INDEX "Following_followingsId_followingId_idx" ON "Following"("followingsId", "followingId");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followesId_fkey" FOREIGN KEY ("followesId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followingsId_fkey" FOREIGN KEY ("followingsId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
