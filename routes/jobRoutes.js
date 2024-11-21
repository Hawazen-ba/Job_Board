const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.route('/').post(jobController.createJob).get(jobController.findJobs);
router.route('/filter').get(job);
router.route('/:id').get(jobController.getJob).delete(jobController.deleteJob).patch(jobController.updateJob);

module.exports = router;