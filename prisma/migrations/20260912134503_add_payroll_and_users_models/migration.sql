/*
  Warnings:

  - You are about to drop the column `academic_year` on the `School` table. All the data in the column will be lost.
  - Added the required column `session` to the `FeeEntrySetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeeEntrySetting" ADD COLUMN     "session" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "academic_year",
ADD COLUMN     "session" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "department" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designation" (
    "id" SERIAL NOT NULL,
    "designation" TEXT NOT NULL,
    "show_in_payroll" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "post" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "key_skill" TEXT NOT NULL,
    "last_date_of_submission" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profession" (
    "id" SERIAL NOT NULL,
    "profession" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffAdmissionNumber" (
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

    CONSTRAINT "StaffAdmissionNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffDocumentType" (
    "id" SERIAL NOT NULL,
    "document_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "StaffDocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffDocument" (
    "id" SERIAL NOT NULL,
    "document_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "document_type" INTEGER NOT NULL,

    CONSTRAINT "StaffDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffType" (
    "id" SERIAL NOT NULL,
    "staff_type" TEXT NOT NULL,
    "is_hourly_paid" BOOLEAN,
    "show_on_ecare" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "StaffType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_reset_password" BOOLEAN,
    "designation" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "profile_picture" TEXT,
    "is_active" BOOLEAN,
    "enable_otp" BOOLEAN,
    "permissions" JSONB,
    "is_admin" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SchoolToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SchoolToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE INDEX "_SchoolToUser_B_index" ON "_SchoolToUser"("B");

-- AddForeignKey
ALTER TABLE "FeeEntrySetting" ADD CONSTRAINT "FeeEntrySetting_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Designation" ADD CONSTRAINT "Designation_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profession" ADD CONSTRAINT "Profession_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffAdmissionNumber" ADD CONSTRAINT "StaffAdmissionNumber_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffDocumentType" ADD CONSTRAINT "StaffDocumentType_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffDocument" ADD CONSTRAINT "StaffDocument_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffDocument" ADD CONSTRAINT "StaffDocument_document_type_fkey" FOREIGN KEY ("document_type") REFERENCES "StaffDocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffType" ADD CONSTRAINT "StaffType_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolToUser" ADD CONSTRAINT "_SchoolToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolToUser" ADD CONSTRAINT "_SchoolToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
