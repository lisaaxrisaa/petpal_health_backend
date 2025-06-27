import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPet = async (req, res) => {
  try {
    const { name, species, breed, age, weight, notes } = req.body;
    const userId = req.user.userId;

    const newPet = await prisma.pet.create({
      data: {
        name,
        species,
        breed: breed || null,
        age: age ? parseInt(age) : null,
        weight: weight ? parseFloat(weight) : null,
        notes: notes || null,
        userId,
      },
    });

    res.status(201).json(newPet);
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserPets = async (req, res) => {
  try {
    const userId = req.user.userId;

    const pets = await prisma.pet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePet = async (req, res) => {
  const petId = parseInt(req.params.id);
  const userId = req.user.userId;
  const { name, species, breed, age } = req.body;

  try {
    const updatedPet = await prisma.pet.updateMany({
      where: { id: petId, userId },
      data: { name, species, breed, age },
    });

    if (updatedPet.count === 0) {
      return res.status(404).json({ error: 'Pet not found or not yours' });
    }

    res.status(200).json({ message: 'Pet updated' });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePet = async (req, res) => {
  const petId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
    const deleted = await prisma.pet.deleteMany({
      where: { id: petId, userId },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Pet not found or not yours' });
    }

    res.status(200).json({
      message: 'Pet deleted successfully',
      petId: Number(req.params.id),
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
