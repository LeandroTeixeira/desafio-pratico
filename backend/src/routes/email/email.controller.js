const nodemailer = require('nodemailer');
const applicantModel = require('../../model/applicant.model');

// async..await is not allowed in global scope, must use a wrapper
async function send({
  from, to, subject, text,
}) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from, // : 'IN8 Estágio <estagio@in8.com>', // sender address
    to, // : 'bar@example.com, baz@example.com', // list of receivers
    subject, // : 'Hello ✔', // Subject line
    text, // : 'Hello world?', // plain text body
  });

  return {
    message: info.messageId,
    previewURL: nodemailer.getTestMessageUrl(info),
  };
  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const sendEmail = async (req, res) => {
  const { subject, text } = req.body;
  if (subject === undefined) return res.status(400).json({ message: 'Error: subject is required.' });
  if (text === undefined) return res.status(400).json({ message: 'Error: text is required.' });

  const destinatarios = (await applicantModel.getAllApplicants())
    .map((applicant) => applicant.email);

  try {
    const response = await send({
      from: " 'IN8 Estágio <estagio@in8.com>'",
      to: destinatarios.join(', '),
      subject,
      text,
    });
    return res.status(202).send(response);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { sendEmail };
