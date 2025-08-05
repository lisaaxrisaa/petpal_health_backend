import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createFoodEntry = async (req, res) => {
  try {
    const {
      petId,
      petName,
      date,
      time,
      mealType,
      foodBrand,
      foodType,
      amount,
      calories,
      appetite,
      allergicReaction,
      allergySymptoms,
      allergyNotes,
      notes
    } = req.body;

    if (!petId || !foodBrand || !date) {
      return res
        .status(400)
        .json({ error: 'petId, foodBrand, and date are required' });
    }

    const newFoodEntry = await prisma.foodEntry.create({
      data: {
        petId: parseInt(petId),
        petName,
        date: new Date(date + 'T00:00:00'),
        time,
        mealType,
        foodBrand,
        foodType,
        amount,
        calories: calories ? parseInt(calories) : null,
        appetite,
        allergicReaction: allergicReaction || false,
        allergySymptoms,
        allergyNotes,
        notes
      },
    });

    res.status(201).json(newFoodEntry);
  } catch (error) {
    console.error('Error creating food entry:', error);
    res.status(500).json({ error: 'Failed to create food entry' });
  }
};

export const getFoodEntriesByPetId = async (req, res) => {
  try {
    const petId = Number(req.params.petId);
    const foodEntries = await prisma.foodEntry.findMany({
      where: { petId },
      orderBy: { date: 'desc' },
    });
    res.status(200).json(foodEntries);
  } catch (error) {
    console.error('Error fetching food entries:', error);
    res.status(500).json({ error: 'Failed to fetch food entries' });
  }
};

export const getFoodEntryById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const foodEntry = await prisma.foodEntry.findUnique({ where: { id } });
    if (!foodEntry) {
      return res.status(404).json({ error: 'Food entry not found' });
    }
    res.status(200).json(foodEntry);
  } catch (error) {
    console.error('Error fetching food entry:', error);
    res.status(500).json({ error: 'Failed to fetch food entry' });
  }
};

export const updateFoodEntry = async (req, res) => {
  try {
    const foodEntryId = Number(req.params.id);
    const {
      date,
      time,
      mealType,
      foodBrand,
      foodType,
      amount,
      calories,
      appetite,
      allergicReaction,
      allergySymptoms,
      allergyNotes,
      notes
    } = req.body;

    const updatedData = {
      date: date ? new Date(date + 'T00:00:00') : undefined,
      time,
      mealType,
      foodBrand,
      foodType,
      amount,
      calories: calories ? parseInt(calories) : null,
      appetite,
      allergicReaction,
      allergySymptoms,
      allergyNotes,
      notes
    };

    // Remove undefined values
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedFoodEntry = await prisma.foodEntry.update({
      where: { id: foodEntryId },
      data: updatedData,
    });

    res.status(200).json(updatedFoodEntry);
  } catch (error) {
    console.error('Error updating food entry:', error);
    res.status(500).json({ error: 'Failed to update food entry' });
  }
};

export const deleteFoodEntry = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.foodEntry.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting food entry:', error);
    res.status(500).json({ error: 'Failed to delete food entry' });
  }
};