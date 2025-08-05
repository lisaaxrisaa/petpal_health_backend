import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createMedication = async (req, res) => {
  try {
    const {
      date,
      vetName,
      petName,
      drugName,
      dosage,
      duration,
      instructions,
      notes,
      purpose,
      time,
      petId,
    } = req.body;

    if (!petId || !drugName || !date) {
      return res
        .status(400)
        .json({ error: 'petId, drugName, and date are required' });
    }

    const newMedication = await prisma.medication.create({
      data: {
        date: new Date(date + 'T00:00:00'),
        vetName,
        petName,
        drugName,
        dosage,
        duration,
        instructions,
        notes,
        purpose,
        time,
        petId: parseInt(petId),
      },
    });

    res.status(201).json(newMedication);
  } catch (error) {
    console.error('Error creating medication:', error);
    res.status(500).json({ error: 'Failed to create medication' });
  }
};

export const getMedicationsByPetId = async (req, res) => {
  try {
    const petId = Number(req.params.petId);
    const meds = await prisma.medication.findMany({
      where: { petId },
      orderBy: { date: 'desc' },
    });
    res.status(200).json(meds);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ error: 'Failed to fetch medications' });
  }
};

export const getMedicationById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const med = await prisma.medication.findUnique({ where: { id } });
    res.status(200).json(med);
  } catch (error) {
    console.error('Error fetching medication:', error);
    res.status(500).json({ error: 'Failed to fetch medication' });
  }
};

export const updateMedication = async (req, res) => {
  try {
    const medicationId = Number(req.params.id);

    const {
      date,
      vetName,
      petName,
      drugName,
      dosage,
      duration,
      instructions,
      notes,
      purpose,
      time,
    } = req.body;

    const updatedData = {
      date: new Date(date + 'T00:00:00'),
      vetName,
      petName,
      drugName,
      dosage,
      duration,
      instructions,
      notes,
      purpose,
      time,
    };

    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedMedication = await prisma.medication.update({
      where: { id: medicationId },
      data: updatedData,
    });

    res.status(200).json(updatedMedication);
  } catch (error) {
    console.error('Error updating medication:', error);
    res.status(500).json({ error: 'Failed to update medication' });
  }
};

export const deleteMedication = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.medication.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting medication:', error);
    res.status(500).json({ error: 'Failed to delete medication' });
  }
};
