/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AcademicYear` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `AcademicYear` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `AcademicYear` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `AcademicYear` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AcademicYear` table. All the data in the column will be lost.
  - You are about to drop the column `yearName` on the `AcademicYear` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AccountGroup` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AccountGroup` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `BankLedger` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `BankLedger` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FinancialYear` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `FinancialYear` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `FinancialYear` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `FinancialYear` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FinancialYear` table. All the data in the column will be lost.
  - You are about to drop the column `yearName` on the `FinancialYear` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `GeneralLedger` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `GeneralLedger` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `NarrationMaster` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `NarrationMaster` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PartyLedger` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PartyLedger` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[year_name]` on the table `AcademicYear` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year_name]` on the table `FinancialYear` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_date` to the `AcademicYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `AcademicYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `AcademicYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_name` to the `AcademicYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `AccountGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `BankLedger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `FinancialYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `FinancialYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `FinancialYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_name` to the `FinancialYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `GeneralLedger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `NarrationMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `PartyLedger` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShouldBe" AS ENUM ('Automatic', 'Manual');

-- DropIndex
DROP INDEX "AcademicYear_yearName_key";

-- DropIndex
DROP INDEX "FinancialYear_yearName_key";

-- AlterTable
ALTER TABLE "AcademicYear" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "isActive",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
DROP COLUMN "yearName",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AccountGroup" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BankLedger" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FinancialYear" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "isActive",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
DROP COLUMN "yearName",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GeneralLedger" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NarrationMaster" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PartyLedger" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "AdmissionGuideline" (
    "id" SERIAL NOT NULL,
    "guidelines" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "AdmissionGuideline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admission" (
    "id" SERIAL NOT NULL,
    "setting_type" TEXT,
    "should_be" "ShouldBe",
    "rec_no" INTEGER,
    "prefix" TEXT,
    "start_from" INTEGER,
    "lead_zero" TEXT,
    "suffix" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodGroup" (
    "id" SERIAL NOT NULL,
    "blood_group" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "BloodGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CadetType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "CadetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caste" (
    "id" SERIAL NOT NULL,
    "caste_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Caste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "is_default" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" SERIAL NOT NULL,
    "document_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "document_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "document_type" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnquiryNoSetting" (
    "id" SERIAL NOT NULL,
    "enquiry_no_setting_should_be" "ShouldBe" NOT NULL,
    "prefix" TEXT NOT NULL,
    "start_from" INTEGER NOT NULL,
    "lead_zero" TEXT NOT NULL,
    "suffix" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "EnquiryNoSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" SERIAL NOT NULL,
    "enquiry_no" TEXT,
    "enquiry_date" TIMESTAMP(3),
    "visitor_name" TEXT NOT NULL,
    "visitor_address" TEXT NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "purpose_is_admission" BOOLEAN,
    "student_name" TEXT,
    "reason_to_visit" TEXT,
    "contact_person" TEXT,
    "reference_details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthMaster" (
    "id" SERIAL NOT NULL,
    "health_parameter" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "unit" INTEGER NOT NULL,

    CONSTRAINT "HealthMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthUnit" (
    "id" SERIAL NOT NULL,
    "unit_name" TEXT NOT NULL,
    "unit_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "HealthUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "house_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Layout" (
    "id" SERIAL NOT NULL,
    "report_name" TEXT NOT NULL,
    "report_title" TEXT NOT NULL,
    "is_header_enable" BOOLEAN,
    "is_header_line_enable" BOOLEAN,
    "is_footer_enable" BOOLEAN,
    "is_footer_line_enable" BOOLEAN,
    "is_logo_enable" BOOLEAN,
    "is_row_no" BOOLEAN,
    "is_group" BOOLEAN,
    "is_sum" BOOLEAN,
    "font_size" TEXT NOT NULL,
    "is_total" TEXT,
    "page_orientation" TEXT,
    "page_layout" TEXT,
    "page_width" INTEGER NOT NULL,
    "page_height" INTEGER NOT NULL,
    "footer_height" INTEGER NOT NULL,
    "header_height" INTEGER NOT NULL,
    "header_line_width" INTEGER NOT NULL,
    "logo_height" INTEGER NOT NULL,
    "column_width" INTEGER NOT NULL,
    "footer_line_height" INTEGER NOT NULL,
    "table_column_height" INTEGER NOT NULL,
    "page_margin_right" INTEGER NOT NULL,
    "page_margin_left" INTEGER NOT NULL,
    "page_margin_bottom" INTEGER NOT NULL,
    "page_margin_top" INTEGER NOT NULL,
    "logo_margin_left" INTEGER NOT NULL,
    "logo_margin_top" INTEGER NOT NULL,
    "table_margin_left" INTEGER NOT NULL,
    "table_margin_top" INTEGER NOT NULL,
    "footer_line_margin_top" INTEGER NOT NULL,
    "header_line_margin_top" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Layout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeritCriteria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "maximum_point" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "MeritCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nationality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Nationality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionalSubject" (
    "id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "OptionalSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parish" (
    "id" SERIAL NOT NULL,
    "parish" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Parish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prospectus" (
    "id" SERIAL NOT NULL,
    "reg_no" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "student_name" TEXT NOT NULL,
    "student_middle_name" TEXT,
    "student_last_name" TEXT,
    "reference" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "father_middle_name" TEXT,
    "father_last_name" TEXT,
    "mother_name" TEXT,
    "mother_middle_name" TEXT,
    "mother_last_name" TEXT,
    "con_person" TEXT,
    "con_mobile" TEXT NOT NULL,
    "con_email" TEXT,
    "h_no_and_streets" TEXT,
    "state" TEXT,
    "city" TEXT,
    "pin_code" TEXT,
    "stationaries" TEXT[],
    "is_online" BOOLEAN,
    "pay_mode" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Prospectus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Religion" (
    "id" SERIAL NOT NULL,
    "religion_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Religion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remark" (
    "id" SERIAL NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Remark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "slot_name" TEXT NOT NULL,
    "slot_date" TIMESTAMP(3),
    "start_time" TEXT,
    "end_time" TEXT,
    "applicant" INTEGER,
    "alloted" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StationaryDetails" (
    "id" SERIAL NOT NULL,
    "stationary_name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "is_online" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "account_name" INTEGER NOT NULL,

    CONSTRAINT "StationaryDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "stream_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,
    "available_seats" INTEGER,
    "is_university" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "term_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcessionType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "ConcessionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concession" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Concession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParishToReligion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ParishToReligion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ParishToReligion_B_index" ON "_ParishToReligion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYear_year_name_key" ON "AcademicYear"("year_name");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialYear_year_name_key" ON "FinancialYear"("year_name");

-- AddForeignKey
ALTER TABLE "AdmissionGuideline" ADD CONSTRAINT "AdmissionGuideline_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodGroup" ADD CONSTRAINT "BloodGroup_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CadetType" ADD CONSTRAINT "CadetType_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caste" ADD CONSTRAINT "Caste_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentType" ADD CONSTRAINT "DocumentType_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_document_type_fkey" FOREIGN KEY ("document_type") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnquiryNoSetting" ADD CONSTRAINT "EnquiryNoSetting_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMaster" ADD CONSTRAINT "HealthMaster_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMaster" ADD CONSTRAINT "HealthMaster_unit_fkey" FOREIGN KEY ("unit") REFERENCES "HealthUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthUnit" ADD CONSTRAINT "HealthUnit_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Layout" ADD CONSTRAINT "Layout_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeritCriteria" ADD CONSTRAINT "MeritCriteria_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nationality" ADD CONSTRAINT "Nationality_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionalSubject" ADD CONSTRAINT "OptionalSubject_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parish" ADD CONSTRAINT "Parish_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospectus" ADD CONSTRAINT "Prospectus_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Religion" ADD CONSTRAINT "Religion_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationaryDetails" ADD CONSTRAINT "StationaryDetails_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationaryDetails" ADD CONSTRAINT "StationaryDetails_account_name_fkey" FOREIGN KEY ("account_name") REFERENCES "GeneralLedger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcessionType" ADD CONSTRAINT "ConcessionType_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concession" ADD CONSTRAINT "Concession_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParishToReligion" ADD CONSTRAINT "_ParishToReligion_A_fkey" FOREIGN KEY ("A") REFERENCES "Parish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParishToReligion" ADD CONSTRAINT "_ParishToReligion_B_fkey" FOREIGN KEY ("B") REFERENCES "Religion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
