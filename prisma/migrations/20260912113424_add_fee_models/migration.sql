/*
  Warnings:

  - Added the required column `class_name` to the `Admission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school` to the `Admission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name` to the `Prospectus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_name` to the `StationaryDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeeReceiptGenerateType" AS ENUM ('GenerateSingleReceipt', 'GenerateSchoolWiseReceipt', 'GenerateFeeTypeWiseReceipt', 'GenerateSchoolWithFeeTypeWiseReceipt');

-- CreateEnum
CREATE TYPE "TransportTerm" AS ENUM ('Monthly', 'Quarterly');

-- CreateEnum
CREATE TYPE "VehicleOwner" AS ENUM ('School', 'Vendor');

-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "board" INTEGER,
ADD COLUMN     "class_name" INTEGER NOT NULL,
ADD COLUMN     "school" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "class_name" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prospectus" ADD COLUMN     "board" INTEGER,
ADD COLUMN     "class_name" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "class_name" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StationaryDetails" ADD COLUMN     "school_name" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "board" TEXT NOT NULL,
    "is_default" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "class_name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "affiliated_heads" JSONB,
    "affiliated_special_heads" JSONB,
    "is_admission_opened" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "wing_name" INTEGER NOT NULL,
    "school" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeeEntrySetting" (
    "id" SERIAL NOT NULL,
    "prefix" TEXT,
    "lead_zero" TEXT,
    "receipt_no_start" TEXT,
    "suffix" TEXT,
    "generate_type" "FeeReceiptGenerateType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeeEntrySetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteStopMonth" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "route_stop_id" INTEGER NOT NULL,
    "transport_group_id" INTEGER,

    CONSTRAINT "RouteStopMonth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteStop" (
    "id" SERIAL NOT NULL,
    "stop_no" TEXT NOT NULL,
    "stop_name" TEXT NOT NULL,
    "morning_arrival_hour" TEXT,
    "morning_arrival_minute" TEXT,
    "morning_arrival_meridiem" TEXT,
    "afternoon_arrival_hour" TEXT,
    "afternoon_arrival_minute" TEXT,
    "afternoon_arrival_meridiem" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "route_no" INTEGER NOT NULL,

    CONSTRAINT "RouteStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "logo" TEXT,
    "school_main" BOOLEAN,
    "school_subheads" BOOLEAN,
    "school_name" TEXT NOT NULL,
    "school_address" TEXT NOT NULL,
    "school_address_2" TEXT,
    "school_short_name" TEXT,
    "contact_no" TEXT,
    "mobile" TEXT,
    "email" TEXT,
    "support_email_id" TEXT,
    "website" TEXT,
    "prefix" TEXT NOT NULL,
    "iso_details" TEXT,
    "principal_signature" TEXT,
    "accountant_signature" TEXT,
    "school_no" TEXT,
    "affiliation_to" TEXT,
    "affiliation_no" TEXT,
    "udise_code" TEXT,
    "pen" TEXT,
    "associates" TEXT,
    "renew_up_to" TEXT,
    "school_status" TEXT,
    "working_days" TEXT,
    "recess" TEXT,
    "total_period" TEXT,
    "academic_year" TEXT,
    "financial_year" TEXT,
    "facebook_link" TEXT,
    "linkedin_link" TEXT,
    "twitter_link" TEXT,
    "instagram_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "section_name" TEXT NOT NULL,
    "order_no" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmsTemplate" (
    "id" SERIAL NOT NULL,
    "sms_type" TEXT NOT NULL,
    "sms_template" TEXT NOT NULL,
    "is_enable" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "SmsTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportGroup" (
    "id" SERIAL NOT NULL,
    "distance_name" TEXT NOT NULL,
    "distance_amount" DOUBLE PRECISION NOT NULL,
    "distance_from" INTEGER,
    "distance_to" INTEGER,
    "transport_term" "TransportTerm",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "TransportGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportMedium" (
    "id" SERIAL NOT NULL,
    "transport_medium" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "TransportMedium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelMaster" (
    "id" SERIAL NOT NULL,
    "travel_agency_name" TEXT NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "mail_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "TravelMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleDetails" (
    "id" SERIAL NOT NULL,
    "vehicle_owner" "VehicleOwner",
    "vehicle_name" TEXT NOT NULL,
    "vehicle_reg_no" TEXT NOT NULL,
    "driver_name" TEXT,
    "attendent_name" TEXT,
    "fule_type" TEXT,
    "seating_capacity" INTEGER,
    "reserved_seats" INTEGER,
    "cctv" BOOLEAN,
    "wifi" BOOLEAN,
    "gps" BOOLEAN,
    "ac" BOOLEAN,
    "driver_mobile_no" TEXT,
    "gps_no" TEXT,
    "service_due_date" TIMESTAMP(3),
    "insurance_due_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,
    "vendor" INTEGER,
    "vehicle_type" INTEGER NOT NULL,

    CONSTRAINT "VehicleDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleRoute" (
    "id" SERIAL NOT NULL,
    "route_no" TEXT NOT NULL,
    "route_description" TEXT,
    "route_in_charge_name" TEXT,
    "route_in_charge_mobile_no" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "VehicleRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" SERIAL NOT NULL,
    "vehicle_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wing" (
    "id" SERIAL NOT NULL,
    "wing" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "Wing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassToSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ClassToSection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_VehicleDetailsToVehicleRoute" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VehicleDetailsToVehicleRoute_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "RouteStopMonth_route_stop_id_month_key" ON "RouteStopMonth"("route_stop_id", "month");

-- CreateIndex
CREATE INDEX "_ClassToSection_B_index" ON "_ClassToSection"("B");

-- CreateIndex
CREATE INDEX "_VehicleDetailsToVehicleRoute_B_index" ON "_VehicleDetailsToVehicleRoute"("B");

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_school_fkey" FOREIGN KEY ("school") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_class_name_fkey" FOREIGN KEY ("class_name") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_board_fkey" FOREIGN KEY ("board") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_class_name_fkey" FOREIGN KEY ("class_name") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospectus" ADD CONSTRAINT "Prospectus_class_name_fkey" FOREIGN KEY ("class_name") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospectus" ADD CONSTRAINT "Prospectus_board_fkey" FOREIGN KEY ("board") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_class_name_fkey" FOREIGN KEY ("class_name") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationaryDetails" ADD CONSTRAINT "StationaryDetails_school_name_fkey" FOREIGN KEY ("school_name") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_wing_name_fkey" FOREIGN KEY ("wing_name") REFERENCES "Wing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_school_fkey" FOREIGN KEY ("school") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStopMonth" ADD CONSTRAINT "RouteStopMonth_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStopMonth" ADD CONSTRAINT "RouteStopMonth_route_stop_id_fkey" FOREIGN KEY ("route_stop_id") REFERENCES "RouteStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStopMonth" ADD CONSTRAINT "RouteStopMonth_transport_group_id_fkey" FOREIGN KEY ("transport_group_id") REFERENCES "TransportGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_route_no_fkey" FOREIGN KEY ("route_no") REFERENCES "VehicleRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmsTemplate" ADD CONSTRAINT "SmsTemplate_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportGroup" ADD CONSTRAINT "TransportGroup_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportMedium" ADD CONSTRAINT "TransportMedium_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelMaster" ADD CONSTRAINT "TravelMaster_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleDetails" ADD CONSTRAINT "VehicleDetails_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleDetails" ADD CONSTRAINT "VehicleDetails_vendor_fkey" FOREIGN KEY ("vendor") REFERENCES "TravelMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleDetails" ADD CONSTRAINT "VehicleDetails_vehicle_type_fkey" FOREIGN KEY ("vehicle_type") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleRoute" ADD CONSTRAINT "VehicleRoute_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleType" ADD CONSTRAINT "VehicleType_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wing" ADD CONSTRAINT "Wing_session_fkey" FOREIGN KEY ("session") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToSection" ADD CONSTRAINT "_ClassToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToSection" ADD CONSTRAINT "_ClassToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleDetailsToVehicleRoute" ADD CONSTRAINT "_VehicleDetailsToVehicleRoute_A_fkey" FOREIGN KEY ("A") REFERENCES "VehicleDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleDetailsToVehicleRoute" ADD CONSTRAINT "_VehicleDetailsToVehicleRoute_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
