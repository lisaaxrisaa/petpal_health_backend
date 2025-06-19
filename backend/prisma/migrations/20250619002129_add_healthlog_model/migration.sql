-- CreateTable
CREATE TABLE "HealthLog" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "condition" TEXT,
    "medicationsGiven" TEXT,
    "vetVisit" BOOLEAN NOT NULL DEFAULT false,
    "petName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "HealthLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HealthLog_petId_idx" ON "HealthLog"("petId");

-- AddForeignKey
ALTER TABLE "HealthLog" ADD CONSTRAINT "HealthLog_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
