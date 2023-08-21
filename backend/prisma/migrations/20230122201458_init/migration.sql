-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GENERALMANAGER', 'USER', 'ADMIN', 'EDITOR', 'WRITER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNSEEN', 'SEEN', 'ANSWERED', 'CLOSED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "role" "Role"[] DEFAULT ARRAY['USER']::"Role"[],
    "img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketSystem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "adminId" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'UNSEEN',
    "title" TEXT NOT NULL,
    "section" "Role" NOT NULL DEFAULT 'EDITOR',
    "message" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketSystem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "TicketSystem" ADD CONSTRAINT "TicketSystem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketSystem" ADD CONSTRAINT "TicketSystem_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
