const sgMail = require('@sendgrid/mail');

export function sendEmail(req, res){
  const { name, email, organization, message } = req.body;

  const msg = {
    to: "info@acartia.io",
    from: `From ${name} at ${organization}. ${email}`,
    subject: "Sent from Acartia.io Questions/Feedback form",
    text: message,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send('Email sent');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending email');
    });
}
