-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WebDev', 'Tech', 'Gadgets', 'Finance', 'Politics', 'Random');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'WebDev';
