import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createVaccine = async (req, res) => {
  try {
    const {
      petId,
      petName,
      vaccineName,
      brandName,
      dateAdministered,
      expirationDate,
      nextDueDate,
      vetClinic,
      veterinarian,
      batchLotNumber,
      doseNumber,
      totalDoses,
      vaccineType,
      sideEffects,
      cost,
      notes
    } = req.body;

    if (!petId || !vaccineName || !dateAdministered) {
      return res
        .status(400)
        .json({ error: 'petId, vaccineName, and dateAdministered are required' });
    }

    const newVaccine = await prisma.vaccine.create({
      data: {
        petId: parseInt(petId),
        petName,
        vaccineName,
        brandName,
        dateAdministered: new Date(dateAdministered + 'T00:00:00'),
        expirationDate: expirationDate ? new Date(expirationDate + 'T00:00:00') : null,
        nextDueDate: nextDueDate ? new Date(nextDueDate + 'T00:00:00') : null,
        vetClinic,
        veterinarian,
        batchLotNumber,
        doseNumber: doseNumber ? parseInt(doseNumber) : null,
        totalDoses: totalDoses ? parseInt(totalDoses) : null,
        vaccineType,
        sideEffects,
        cost: cost ? parseFloat(cost) : null,
        notes
      },
    });

    res.status(201).json(newVaccine);
  } catch (error) {
    console.error('Error creating vaccine:', error);
    res.status(500).json({ error: 'Failed to create vaccine' });
  }
};

export const getVaccinesByPetId = async (req, res) => {
  try {
    const petId = Number(req.params.petId);
    const vaccines = await prisma.vaccine.findMany({
      where: { petId },
      orderBy: { dateAdministered: 'desc' },
    });
    res.status(200).json(vaccines);
  } catch (error) {
    console.error('Error fetching vaccines:', error);
    res.status(500).json({ error: 'Failed to fetch vaccines' });
  }
};

export const getVaccineById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const vaccine = await prisma.vaccine.findUnique({ where: { id } });
    if (!vaccine) {
      return res.status(404).json({ error: 'Vaccine not found' });
    }
    res.status(200).json(vaccine);
  } catch (error) {
    console.error('Error fetching vaccine:', error);
    res.status(500).json({ error: 'Failed to fetch vaccine' });
  }
};

export const updateVaccine = async (req, res) => {
  try {
    const vaccineId = Number(req.params.id);
    const {
      vaccineName,
      brandName,
      dateAdministered,
      expirationDate,
      nextDueDate,
      vetClinic,
      veterinarian,
      batchLotNumber,
      doseNumber,
      totalDoses,
      vaccineType,
      sideEffects,
      cost,
      notes
    } = req.body;

    const updatedData = {
      vaccineName,
      brandName,
      dateAdministered: dateAdministered ? new Date(dateAdministered + 'T00:00:00') : undefined,
      expirationDate: expirationDate ? new Date(expirationDate + 'T00:00:00') : null,
      nextDueDate: nextDueDate ? new Date(nextDueDate + 'T00:00:00') : null,
      vetClinic,
      veterinarian,
      batchLotNumber,
      doseNumber: doseNumber ? parseInt(doseNumber) : null,
      totalDoses: totalDoses ? parseInt(totalDoses) : null,
      vaccineType,
      sideEffects,
      cost: cost ? parseFloat(cost) : null,
      notes
    };

    // Remove undefined values
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedVaccine = await prisma.vaccine.update({
      where: { id: vaccineId },
      data: updatedData,
    });

    res.status(200).json(updatedVaccine);
  } catch (error) {
    console.error('Error updating vaccine:', error);
    res.status(500).json({ error: 'Failed to update vaccine' });
  }
};

export const deleteVaccine = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.vaccine.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting vaccine:', error);
    res.status(500).json({ error: 'Failed to delete vaccine' });
  }
};

export const getUpcomingVaccines = async (req, res) => {
  try {
    const petId = Number(req.params.petId);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const upcomingVaccines = await prisma.vaccine.findMany({
      where: {
        petId,
        nextDueDate: {
          gte: today,
          lte: thirtyDaysFromNow,
        },
      },
      orderBy: { nextDueDate: 'asc' },
    });

    res.status(200).json(upcomingVaccines);
  } catch (error) {
    console.error('Error fetching upcoming vaccines:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming vaccines' });
  }
};