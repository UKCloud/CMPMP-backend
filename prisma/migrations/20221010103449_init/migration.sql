/*
  Warnings:

  - You are about to drop the `Dashboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Dashboard";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "sub" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "group" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dashboards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userSub" INTEGER,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "group" TEXT,
    CONSTRAINT "Dashboards_userSub_fkey" FOREIGN KEY ("userSub") REFERENCES "Users" ("sub") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sid_key" ON "Sessions"("sid");
