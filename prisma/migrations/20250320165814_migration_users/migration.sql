/*
  Warnings:

  - You are about to drop the column `agency_id` on the `users` table. All the data in the column will be lost.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_agency_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "agency_id",
ALTER COLUMN "role" SET NOT NULL;

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "services" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_agencies" (
    "id" UUID NOT NULL,
    "agency_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "users_agencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_companies" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "users_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- AddForeignKey
ALTER TABLE "users_agencies" ADD CONSTRAINT "users_agencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_agencies" ADD CONSTRAINT "users_agencies_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
