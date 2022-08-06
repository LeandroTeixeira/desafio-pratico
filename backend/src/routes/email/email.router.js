const express = require('express');
const LoginController = require('../login/login.controller');
const EmailController = require('./email.controller');

class EmailRouter {
  router;

  loginController;

  constructor() {
    this.loginController = new LoginController();
    this.router = express.Router();
    this.router.post('/', this.loginController.getMiddleware(), EmailController.sendEmail);
  }

  getRouter() {
    return this.router;
  }
}
module.exports = EmailRouter;
