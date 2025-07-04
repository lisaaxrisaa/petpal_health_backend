import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createHealthLog = async (req, res) => {
  try {
    console.log('Creating new log with data:', req.body);
    const {
      date,
      notes,
      condition,
      medicationsGiven,
      vetVisit,
      petName,
      petId,
    } = req.body;

    if (!petId) {
      return res.status(400).json({ error: 'petId is required' });
    }

    const newLog = await prisma.healthLog.create({
      data: {
        date: new Date(`${date}T00:00:00`),
        notes,
        condition,
        medicationsGiven,
        vetVisit,
        petName,
        petId: parseInt(petId),
      },
    });

    console.log('Saved log:', newLog);

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

export const getSingleHealthLog = async (req, res) => {
  try {
    const logId = parseInt(req.params.logId);
    const log = await prisma.healthLog.findUnique({
      where: { id: logId },
    });

    if (!log) {
      return res.status(404).json({ error: 'Health log not found' });
    }

    res.status(200).json(log);
  } catch (err) {
    console.error('Error fetching single health log:', err);
    res.status(500).json({ error: 'Failed to fetch health log' });
  }
};

export const updateHealthLog = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      date,
      notes,
      condition,
      medicationsGiven,
      vetVisit,
      petName,
      petId,
    } = req.body;

    const updatedLog = await prisma.healthLog.update({
      where: { id },
      data: {
        petId: Number(petId),
        petName,
        date: new Date(date),
        notes,
        condition,
        medicationsGiven,
        vetVisit,
      },
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
