/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Dashboard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userSub" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    CONSTRAINT "Dashboard_userSub_fkey" FOREIGN KEY ("userSub") REFERENCES "User" ("sub") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "sub" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_User" ("name", "role", "sub") SELECT "name", "role", "sub" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
