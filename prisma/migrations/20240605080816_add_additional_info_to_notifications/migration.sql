/*
  Warnings:

  - You are about to drop the column `description` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `message` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "description",
ADD COLUMN     "actorProfilePicUrl" TEXT,
ADD COLUMN     "actorUsername" TEXT,
ADD COLUMN     "additionalInfo" JSONB,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;
