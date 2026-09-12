-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_reset_password" BOOLEAN NOT NULL DEFAULT false,
    "designation" TEXT,
    "email" TEXT,
    "employee" TEXT,
    "mobile" INTEGER,
    "profile_picture" TEXT,
    "schools" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "enable_otp" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");
