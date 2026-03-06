/*
  Warnings:

  - The primary key for the `addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `establishments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `establishments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `addressId` column on the `establishments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `service_offer_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `service_offer_roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `service_offers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `service_offers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categoryId` column on the `service_offers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `service_subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `service_subscriptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user_roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `addressId` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `service_offer_roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `service_offers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `service_subscriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `addresses` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `slug` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ownerId` on the `establishments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `slug` on the `establishments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `slug` was added to the `reviews` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `serviceOfferId` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `authorId` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `targetId` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `slug` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `slug` was added to the `service_offer_roles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `service_offer_roles` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `serviceOfferId` on the `service_offer_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roleId` on the `service_offer_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `slug` was added to the `service_offers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `establishmentId` on the `service_offers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `slug` was added to the `service_subscriptions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `userId` on the `service_subscriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `serviceOfferId` on the `service_subscriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `slug` was added to the `user_roles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `user_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roleId` on the `user_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `slug` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "establishments" DROP CONSTRAINT "establishments_addressId_fkey";

-- DropForeignKey
ALTER TABLE "establishments" DROP CONSTRAINT "establishments_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_authorId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_serviceOfferId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_targetId_fkey";

-- DropForeignKey
ALTER TABLE "service_offer_roles" DROP CONSTRAINT "service_offer_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "service_offer_roles" DROP CONSTRAINT "service_offer_roles_serviceOfferId_fkey";

-- DropForeignKey
ALTER TABLE "service_offers" DROP CONSTRAINT "service_offers_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "service_offers" DROP CONSTRAINT "service_offers_establishmentId_fkey";

-- DropForeignKey
ALTER TABLE "service_subscriptions" DROP CONSTRAINT "service_subscriptions_serviceOfferId_fkey";

-- DropForeignKey
ALTER TABLE "service_subscriptions" DROP CONSTRAINT "service_subscriptions_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_addressId_fkey";

-- DropIndex
DROP INDEX "categories_slug_idx";

-- DropIndex
DROP INDEX "roles_slug_idx";

-- AlterTable
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "slug",
ADD COLUMN     "slug" UUID NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "establishments" DROP CONSTRAINT "establishments_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" INTEGER NOT NULL,
DROP COLUMN "slug",
ADD COLUMN     "slug" UUID NOT NULL,
DROP COLUMN "addressId",
ADD COLUMN     "addressId" INTEGER,
ADD CONSTRAINT "establishments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" UUID NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "serviceOfferId",
ADD COLUMN     "serviceOfferId" INTEGER NOT NULL,
DROP COLUMN "authorId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
DROP COLUMN "targetId",
ADD COLUMN     "targetId" INTEGER NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "slug",
ADD COLUMN     "slug" UUID NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "service_offer_roles" DROP CONSTRAINT "service_offer_roles_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" UUID NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "serviceOfferId",
ADD COLUMN     "serviceOfferId" INTEGER NOT NULL,
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "service_offer_roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "service_offers" DROP CONSTRAINT "service_offers_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "establishmentId",
ADD COLUMN     "establishmentId" INTEGER NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER,
ADD CONSTRAINT "service_offers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "service_subscriptions" DROP CONSTRAINT "service_subscriptions_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "serviceOfferId",
ADD COLUMN     "serviceOfferId" INTEGER NOT NULL,
ADD CONSTRAINT "service_subscriptions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" UUID NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "controls" JSON,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "addressId",
ADD COLUMN     "addressId" INTEGER,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_slug_key" ON "addresses"("slug");

-- CreateIndex
CREATE INDEX "addresses_slug_idx" ON "addresses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "establishments_slug_key" ON "establishments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "establishments_ownerId_key" ON "establishments"("ownerId");

-- CreateIndex
CREATE INDEX "establishments_slug_idx" ON "establishments"("slug");

-- CreateIndex
CREATE INDEX "establishments_ownerId_idx" ON "establishments"("ownerId");

-- CreateIndex
CREATE INDEX "establishments_addressId_idx" ON "establishments"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_slug_key" ON "reviews"("slug");

-- CreateIndex
CREATE INDEX "reviews_slug_idx" ON "reviews"("slug");

-- CreateIndex
CREATE INDEX "reviews_targetId_idx" ON "reviews"("targetId");

-- CreateIndex
CREATE INDEX "reviews_serviceOfferId_idx" ON "reviews"("serviceOfferId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_serviceOfferId_authorId_targetId_key" ON "reviews"("serviceOfferId", "authorId", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_key" ON "roles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "service_offer_roles_slug_key" ON "service_offer_roles"("slug");

-- CreateIndex
CREATE INDEX "service_offer_roles_slug_idx" ON "service_offer_roles"("slug");

-- CreateIndex
CREATE INDEX "service_offer_roles_serviceOfferId_idx" ON "service_offer_roles"("serviceOfferId");

-- CreateIndex
CREATE INDEX "service_offer_roles_roleId_idx" ON "service_offer_roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "service_offer_roles_serviceOfferId_roleId_key" ON "service_offer_roles"("serviceOfferId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "service_offers_slug_key" ON "service_offers"("slug");

-- CreateIndex
CREATE INDEX "service_offers_slug_idx" ON "service_offers"("slug");

-- CreateIndex
CREATE INDEX "service_offers_establishmentId_idx" ON "service_offers"("establishmentId");

-- CreateIndex
CREATE INDEX "service_offers_categoryId_idx" ON "service_offers"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "service_subscriptions_slug_key" ON "service_subscriptions"("slug");

-- CreateIndex
CREATE INDEX "service_subscriptions_slug_idx" ON "service_subscriptions"("slug");

-- CreateIndex
CREATE INDEX "service_subscriptions_userId_idx" ON "service_subscriptions"("userId");

-- CreateIndex
CREATE INDEX "service_subscriptions_serviceOfferId_idx" ON "service_subscriptions"("serviceOfferId");

-- CreateIndex
CREATE INDEX "service_subscriptions_userId_status_idx" ON "service_subscriptions"("userId", "status");

-- CreateIndex
CREATE INDEX "service_subscriptions_serviceOfferId_status_idx" ON "service_subscriptions"("serviceOfferId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "service_subscriptions_userId_serviceOfferId_key" ON "service_subscriptions"("userId", "serviceOfferId");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_slug_key" ON "user_roles"("slug");

-- CreateIndex
CREATE INDEX "user_roles_slug_idx" ON "user_roles"("slug");

-- CreateIndex
CREATE INDEX "user_roles_userId_idx" ON "user_roles"("userId");

-- CreateIndex
CREATE INDEX "user_roles_roleId_idx" ON "user_roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleId_key" ON "user_roles"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");

-- CreateIndex
CREATE INDEX "users_slug_idx" ON "users"("slug");

-- CreateIndex
CREATE INDEX "users_addressId_idx" ON "users"("addressId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "establishments" ADD CONSTRAINT "establishments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "establishments" ADD CONSTRAINT "establishments_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_offers" ADD CONSTRAINT "service_offers_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_offers" ADD CONSTRAINT "service_offers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_offer_roles" ADD CONSTRAINT "service_offer_roles_serviceOfferId_fkey" FOREIGN KEY ("serviceOfferId") REFERENCES "service_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_offer_roles" ADD CONSTRAINT "service_offer_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_subscriptions" ADD CONSTRAINT "service_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_subscriptions" ADD CONSTRAINT "service_subscriptions_serviceOfferId_fkey" FOREIGN KEY ("serviceOfferId") REFERENCES "service_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_serviceOfferId_fkey" FOREIGN KEY ("serviceOfferId") REFERENCES "service_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
