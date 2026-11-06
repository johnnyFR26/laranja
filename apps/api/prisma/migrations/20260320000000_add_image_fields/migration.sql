-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "mainImageUrl" TEXT;

-- AlterTable
ALTER TABLE "establishments" ADD COLUMN     "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "mainImageUrl" TEXT;

-- AlterTable
ALTER TABLE "service_offers" ADD COLUMN     "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "mainImageUrl" TEXT;
