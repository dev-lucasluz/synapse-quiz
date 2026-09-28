-- AlterTable
ALTER TABLE "User" ADD COLUMN "emailCanonical" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_emailCanonical_key" ON "User"("emailCanonical");

-- O preenchimento das contas existentes (canonicalEmail) é feito por script
-- (scripts/backfill-email-canonical.ts / turso-init), pois depende da regra em TypeScript.
