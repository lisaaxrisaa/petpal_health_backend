import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createHealthLog = async (req, res) => {
  try {
    const {
      date,
      notes,
      condition,
      medicationsGiven,
      vetVisit,
      petName,
      petId,
    } = req.body;

    const newLog = await prisma.healthLog.create({
      data: {
        date: new Date(date),
        notes,
        condition,
        medicationsGiven,
        vetVisit,
        petName,
        petId,
      },
    });

    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error creating health log:', error);
    res.status(500).json({ error: 'Failed to create health log' });
  }
};

export const getHealthLogsByPetId = async (req, res) => {
  try {
    const petId = Number(req.params.petId);
    const logs = await prisma.healthLog.findMany({
      where: { petId },
      orderBy: { date: 'desc' },
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching health logs:', error);
    res.status(500).json({ error: 'Failed to fetch health logs' });
  }
};

export const updateHealthLog = async (req, res) => {
  try {
    const logId = Number(req.params.id);
    const updatedData = req.body;

    const updatedLog = await prisma.healthLog.update({
      where: { id: logId },
      data: updatedData,
    });

    res.status(200).json(updatedLog);
  } catch (error) {
    console.error('Error updating health log:', error);
    res.status(500).json({ error: 'Failed to update health log' });
  }
};

export const deleteHealthLog = async (req, res) => {
  try {
    const logId = Number(req.params.id);
    await prisma.healthLog.delete({
      where: { id: logId },
    });

    res.status(200).json({ message: 'Health log deleted', logId });
  } catch (error) {
    console.error('Error deleting health log:', error);
    res.status(500).json({ error: 'Failed to delete health log' });
  }
};
