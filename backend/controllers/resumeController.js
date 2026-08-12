const prisma = require('../prismaClient');

const getResumes = async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' }
    });
    res.json({ success: true, resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch resumes' });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: req.params.id }
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to resume' });
    }

    res.json({ success: true, resume });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch resume' });
  }
};

const createResume = async (req, res) => {
  const { title, template, resumeData } = req.body;
  try {
    const newResume = await prisma.resume.create({
      data: {
        userId: req.user.id,
        title: title || 'Untitled Resume',
        template: template || 'Minimal',
        resumeData: JSON.stringify(resumeData || {})
      }
    });
    res.status(201).json({ success: true, resume: newResume });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create resume' });
  }
};

const updateResume = async (req, res) => {
  const { title, template, resumeData } = req.body;
  try {
    const resume = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
    if (resume.userId !== req.user.id) return res.status(403).json({ success: false, message: 'Unauthorized' });

    const updated = await prisma.resume.update({
      where: { id: req.params.id },
      data: { title, template, resumeData: JSON.stringify(resumeData) }
    });
    res.json({ success: true, resume: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update resume' });
  }
};

const duplicateResume = async (req, res) => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
    if (resume.userId !== req.user.id) return res.status(403).json({ success: false, message: 'Unauthorized' });

    const newResume = await prisma.resume.create({
      data: {
        userId: req.user.id,
        title: `${resume.title} (Copy)`,
        template: resume.template,
        resumeData: resume.resumeData
      }
    });
    res.status(201).json({ success: true, resume: newResume });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to duplicate resume' });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!resume) return res.status(404).json({ success: false, message: 'Resume not found' });
    if (resume.userId !== req.user.id) return res.status(403).json({ success: false, message: 'Unauthorized' });

    await prisma.resume.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete resume' });
  }
};

module.exports = { getResumes, getResume, createResume, updateResume, duplicateResume, deleteResume };
