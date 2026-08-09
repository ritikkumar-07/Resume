const express = require('express');
const { getResumes, getResume, createResume, updateResume, duplicateResume, deleteResume } = require('../controllers/resumeController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', getResumes);
router.post('/', createResume);
router.get('/:id', getResume);
router.put('/:id', updateResume);
router.post('/:id/duplicate', duplicateResume);
router.delete('/:id', deleteResume);

module.exports = router;
