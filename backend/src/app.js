const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ApplicantRouter = require('./routes/applicant/applicant.router');
const LoginRouter = require('./routes/login/login.router');
const EmailRouter = require('./routes/email/email.router');

const app = express();
app.use(cors({ origin: 'http://localhost:8000' }));
app.use(morgan('combined'));
app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/applicant', new ApplicantRouter().getRouter());
app.use('/login', new LoginRouter().getRouter());
app.use('/email', new EmailRouter().getRouter());

// app.get('/*', (_, res) => {
//   res.send(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;
