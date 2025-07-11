-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "petName" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "vetName" TEXT,
    "drugName" TEXT NOT NULL,
    "dosage" TEXT,
    "duration" TEXT,
    "instructions" TEXT,
    "purpose" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
