-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "BudgetType" AS ENUM ('FIXED', 'HOURLY', 'NEGOTIABLE');

-- CreateEnum
CREATE TYPE "ServiceOfferStatus" AS ENUM ('DRAFT', 'OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "number" VARCHAR(20),
    "complement" VARCHAR(100),
    "neighborhood" VARCHAR(100),
    "city" VARCHAR(100) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zipCode" VARCHAR(10) NOT NULL,
    "country" CHAR(2) NOT NULL DEFAULT 'BR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "avatarUrl" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "addressId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "establishments" (
    "id" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "website" VARCHAR(255),
    "addressId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "establishments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_offers" (
    "id" UUID NOT NULL,
    "establishmentId" UUID NOT NULL,
    "categoryId" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DECIMAL(12,2),
    "budgetType" "BudgetType" NOT NULL DEFAULT 'FIXED',
    "status" "ServiceOfferStatus" NOT NULL DEFAULT 'DRAFT',
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_offer_roles" (
    "id" UUID NOT NULL,
    "serviceOfferId" UUID NOT NULL,
    "roleId" UUID NOT NULL,

    CONSTRAINT "service_offer_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_subscriptions" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "serviceOfferId" UUID NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING',
    "coverLetter" TEXT,
    "proposedBudget" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "serviceOfferId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "targetId" UUID NOT NULL,
    "rating" SMALLINT NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "addresses_city_state_idx" ON "addresses"("city", "state");

-- CreateIndex
CREATE INDEX "addresses_zipCode_idx" ON "addresses"("zipCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_addressId_idx" ON "users"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_key" ON "roles"("slug");

-- CreateIndex
CREATE INDEX "roles_slug_idx" ON "roles"("slug");

-- CreateIndex
CREATE INDEX "user_roles_userId_idx" ON "user_roles"("userId");

-- CreateIndex
CREATE INDEX "user_roles_roleId_idx" ON "user_roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleId_key" ON "user_roles"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "establishments_ownerId_key" ON "establishments"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "establishments_slug_key" ON "establishments"("slug");

-- CreateIndex
CREATE INDEX "establishments_ownerId_idx" ON "establishments"("ownerId");

-- CreateIndex
CREATE INDEX "establishments_slug_idx" ON "establishments"("slug");

-- CreateIndex
CREATE INDEX "establishments_addressId_idx" ON "establishments"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "service_offers_establishmentId_idx" ON "service_offers"("establishmentId");

-- CreateIndex
CREATE INDEX "service_offers_categoryId_idx" ON "service_offers"("categoryId");

-- CreateIndex
CREATE INDEX "service_offers_status_idx" ON "service_offers"("status");

-- CreateIndex
CREATE INDEX "service_offers_status_createdAt_idx" ON "service_offers"("status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "service_offers_budgetType_status_idx" ON "service_offers"("budgetType", "status");

-- CreateIndex
CREATE INDEX "service_offer_roles_serviceOfferId_idx" ON "service_offer_roles"("serviceOfferId");

-- CreateIndex
CREATE INDEX "service_offer_roles_roleId_idx" ON "service_offer_roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "service_offer_roles_serviceOfferId_roleId_key" ON "service_offer_roles"("serviceOfferId", "roleId");

-- CreateIndex
CREATE INDEX "service_subscriptions_userId_idx" ON "service_subscriptions"("userId");

-- CreateIndex
CREATE INDEX "service_subscriptions_serviceOfferId_idx" ON "service_subscriptions"("serviceOfferId");

-- CreateIndex
CREATE INDEX "service_subscriptions_status_idx" ON "service_subscriptions"("status");

-- CreateIndex
CREATE INDEX "service_subscriptions_userId_status_idx" ON "service_subscriptions"("userId", "status");

-- CreateIndex
CREATE INDEX "service_subscriptions_serviceOfferId_status_idx" ON "service_subscriptions"("serviceOfferId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "service_subscriptions_userId_serviceOfferId_key" ON "service_subscriptions"("userId", "serviceOfferId");

-- CreateIndex
CREATE INDEX "reviews_targetId_idx" ON "reviews"("targetId");

-- CreateIndex
CREATE INDEX "reviews_serviceOfferId_idx" ON "reviews"("serviceOfferId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_serviceOfferId_authorId_targetId_key" ON "reviews"("serviceOfferId", "authorId", "targetId");

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
