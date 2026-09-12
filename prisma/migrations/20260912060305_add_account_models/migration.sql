/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LedgerCategory" AS ENUM ('Bank', 'Party', 'General');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('Assets', 'Liability', 'Trading', 'ProfitAndLoss');

-- CreateEnum
CREATE TYPE "VoucherType" AS ENUM ('CashPaymentVoucher', 'CashReceiptVoucher', 'BankPaymentVoucher', 'BankReceiptVoucher', 'ContraVoucher', 'JournalVoucher');

-- CreateEnum
CREATE TYPE "BalanceType" AS ENUM ('Debit', 'Credit');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "AccountGroup" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "category" "LedgerCategory" NOT NULL,
    "group_type" "GroupType" NOT NULL,
    "group_no" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "AccountGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankLedger" (
    "id" SERIAL NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_no" INTEGER NOT NULL,
    "account_type" TEXT,
    "account_address" TEXT,
    "account_city" TEXT,
    "pin_code" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "opening_balance" DOUBLE PRECISION NOT NULL,
    "opening_balance_type" "BalanceType",
    "assign_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "group" INTEGER NOT NULL,

    CONSTRAINT "BankLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralLedger" (
    "id" SERIAL NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "opening_balance" DOUBLE PRECISION,
    "opening_balance_type" "BalanceType",
    "assign_date" TIMESTAMP(3),
    "is_cash_book" BOOLEAN,
    "is_fixed_asset" BOOLEAN,
    "depreciation" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "group" INTEGER NOT NULL,

    CONSTRAINT "GeneralLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NarrationMaster" (
    "id" SERIAL NOT NULL,
    "narration" TEXT NOT NULL,
    "voucher_type" "VoucherType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "NarrationMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyLedger" (
    "id" SERIAL NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_no" INTEGER NOT NULL,
    "cin_no" TEXT,
    "account_type" TEXT NOT NULL,
    "account_address" TEXT,
    "account_city" TEXT,
    "pin_code" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "pan" TEXT,
    "gstin" TEXT,
    "opening_balance" DOUBLE PRECISION,
    "opening_balance_type" "BalanceType",
    "assign_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "group" INTEGER NOT NULL,

    CONSTRAINT "PartyLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialYear" (
    "id" SERIAL NOT NULL,
    "yearName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialYear_yearName_key" ON "FinancialYear"("yearName");

-- AddForeignKey
ALTER TABLE "AccountGroup" ADD CONSTRAINT "AccountGroup_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankLedger" ADD CONSTRAINT "BankLedger_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankLedger" ADD CONSTRAINT "BankLedger_group_fkey" FOREIGN KEY ("group") REFERENCES "AccountGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralLedger" ADD CONSTRAINT "GeneralLedger_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralLedger" ADD CONSTRAINT "GeneralLedger_group_fkey" FOREIGN KEY ("group") REFERENCES "AccountGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrationMaster" ADD CONSTRAINT "NarrationMaster_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyLedger" ADD CONSTRAINT "PartyLedger_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyLedger" ADD CONSTRAINT "PartyLedger_group_fkey" FOREIGN KEY ("group") REFERENCES "AccountGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
