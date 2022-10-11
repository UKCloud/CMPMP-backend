/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "sub" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "group" TEXT NOT NULL
);
INSERT INTO "new_Users" ("group", "name", "role", "sub") SELECT "group", "name", "role", "sub" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE TABLE "new_Dashboards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userSub" TEXT,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "group" TEXT,
    CONSTRAINT "Dashboards_userSub_fkey" FOREIGN KEY ("userSub") REFERENCES "Users" ("sub") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dashboards" ("data", "group", "id", "name", "userSub") SELECT "data", "group", "id", "name", "userSub" FROM "Dashboards";
DROP TABLE "Dashboards";
ALTER TABLE "new_Dashboards" RENAME TO "Dashboards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
