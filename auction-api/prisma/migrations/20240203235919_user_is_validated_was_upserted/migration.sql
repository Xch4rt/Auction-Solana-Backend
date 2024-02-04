-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isValidated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wasUpserted" BOOLEAN NOT NULL DEFAULT false;
