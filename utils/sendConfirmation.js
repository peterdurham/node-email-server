var nodemailer = require("nodemailer");

sendConfirmation = (id, email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const confirmLink = `http://localhost:3000/confirm?q=${id}`;
  const unsubscribeLink = `http://localhost:3000/unsubscribe?q=${id}`;

  const mailOptions = {
    from: "codeboostsite@email.com", // sender address
    to: email, // list of receivers
    subject: "Hi there I wrote this with a node server", // Subject line
    html:
      "<div><h2>So much HTML here</h2><a href=" +
      confirmLink +
      ">Confirm Subscribe</a><a href=" +
      unsubscribeLink +
      ">Later, when you sign up unsubscribe here</a></div>", // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = {
  sendConfirmation,
};
