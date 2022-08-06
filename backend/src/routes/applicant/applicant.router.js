const express = require('express');
const ApplicantController = require('./applicant.controller');

class ApplicantRouter {
  router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', ApplicantController.postApplicant);
    this.router.get('/', ApplicantController.getApplicants);
  }

  getRouter() {
    return this.router;
  }
}
module.exports = ApplicantRouter;
