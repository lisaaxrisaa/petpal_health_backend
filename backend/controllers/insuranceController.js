import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createInsurance = async (req, res) => {
  try {
    const {
      petId,
      petName,
      provider,
      policyNumber,
      status,
      policyStartDate,
      policyEndDate,
      annualCoverageLimit,
      reimbursementPercent,
      deductibleAmount,
      monthlyPremium,
      vetExamFees,
      wellnessCoverage,
      rehabCoverage,
      extraCarePack,
      nextBillingDate,
      notes
    } = req.body;

    if (!petId || !provider || !policyNumber || !policyStartDate || !policyEndDate) {
      return res
        .status(400)
        .json({ error: 'petId, provider, policyNumber, policyStartDate, and policyEndDate are required' });
    }

    const newInsurance = await prisma.insurance.create({
      data: {
        petId: parseInt(petId),
        petName,
        provider,
        policyNumber,
        status: status || 'Active',
        policyStartDate: new Date(policyStartDate + 'T00:00:00'),
        policyEndDate: new Date(policyEndDate + 'T00:00:00'),
        annualCoverageLimit: annualCoverageLimit ? parseFloat(annualCoverageLimit) : null,
        reimbursementPercent: reimbursementPercent ? parseInt(reimbursementPercent) : null,
        deductibleAmount: deductibleAmount ? parseFloat(deductibleAmount) : null,
        monthlyPremium: monthlyPremium ? parseFloat(monthlyPremium) : null,
        vetExamFees: vetExamFees || false,
        wellnessCoverage: wellnessCoverage || false,
        rehabCoverage: rehabCoverage || false,
        extraCarePack: extraCarePack || false,
        nextBillingDate: nextBillingDate ? new Date(nextBillingDate + 'T00:00:00') : null,
        notes
      },
    });

    res.status(201).json(newInsurance);
  } catch (error) {
    console.error('Error creating insurance:', error);
    res.status(500).json({ error: 'Failed to create insurance' });
  }
};

export const getInsuranceByPetId = async (req, res) => {
  try {
    const petId = Number(req.params.petId);
    const insurance = await prisma.insurance.findMany({
      where: { petId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(insurance);
  } catch (error) {
    console.error('Error fetching insurance:', error);
    res.status(500).json({ error: 'Failed to fetch insurance' });
  }
};

export const getInsuranceById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const insurance = await prisma.insurance.findUnique({ where: { id } });
    if (!insurance) {
      return res.status(404).json({ error: 'Insurance not found' });
    }
    res.status(200).json(insurance);
  } catch (error) {
    console.error('Error fetching insurance:', error);
    res.status(500).json({ error: 'Failed to fetch insurance' });
  }
};

export const updateInsurance = async (req, res) => {
  try {
    const insuranceId = Number(req.params.id);
    const {
      provider,
      policyNumber,
      status,
      policyStartDate,
      policyEndDate,
      annualCoverageLimit,
      reimbursementPercent,
      deductibleAmount,
      monthlyPremium,
      vetExamFees,
      wellnessCoverage,
      rehabCoverage,
      extraCarePack,
      nextBillingDate,
      notes
    } = req.body;

    const updatedData = {
      provider,
      policyNumber,
      status,
      policyStartDate: policyStartDate ? new Date(policyStartDate + 'T00:00:00') : undefined,
      policyEndDate: policyEndDate ? new Date(policyEndDate + 'T00:00:00') : undefined,
      annualCoverageLimit: annualCoverageLimit ? parseFloat(annualCoverageLimit) : null,
      reimbursementPercent: reimbursementPercent ? parseInt(reimbursementPercent) : null,
      deductibleAmount: deductibleAmount ? parseFloat(deductibleAmount) : null,
      monthlyPremium: monthlyPremium ? parseFloat(monthlyPremium) : null,
      vetExamFees,
      wellnessCoverage,
      rehabCoverage,
      extraCarePack,
      nextBillingDate: nextBillingDate ? new Date(nextBillingDate + 'T00:00:00') : null,
      notes
    };

    // Remove undefined values
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedInsurance = await prisma.insurance.update({
      where: { id: insuranceId },
      data: updatedData,
    });

    res.status(200).json(updatedInsurance);
  } catch (error) {
    console.error('Error updating insurance:', error);
    res.status(500).json({ error: 'Failed to update insurance' });
  }
};

export const deleteInsurance = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.insurance.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting insurance:', error);
    res.status(500).json({ error: 'Failed to delete insurance' });
  }
};