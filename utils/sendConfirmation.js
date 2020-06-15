var nodemailer = require("nodemailer");

sendConfirmation = (id, email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const confirmLink = `https://www.code-boost.com/confirm?q=${id}`;
  const unsubscribeLink = `https://www.code-boost.com/unsubscribe?q=${id}`;

  const mailOptions = {
    from: "codeboostsite@email.com", // sender address
    to: email, // list of receivers
    subject: "Code Boost Newsletter Confirmation", // Subject line
    html: `<div>
      <div style="width: 100%;height: 70px;background:rgb(17,17,17);color:white;margin-bottom:48px;">
        <div style="width:600px;margin:0 auto;display: flex;align-items:center;">
          <h2 style="font-size:24px;">Code Boost</h2>
        </div>  
      </div>
    <div style="width:600px;margin:0 auto;">
    <h2 style="color:#111;margin-bottom:24px;">Thanks for signing up!</h2>
    <p style="margin-bottom: 24px; color: #111;">Stay tuned for weekly articles and tutorials on a variety of topics.</p>
    <a href="${confirmLink}" style="padding: 8px 16px; background:#0075ea;color:#fff; display: flex; align-items: center; justify-content:center;text-decoration: none; border-radius:4px; height:20px; width: 107px;">Confirm Subscribe</a>
    </div>
    <div style="width: 100%;height: 70px;background:rgb(17,17,17);color:white;margin-top:48px;">
        <div style="width:600px;margin:0 auto;display: flex; align-items:center; color:#fff;">
          <p style="font-weight:700; display:flex; font-size: 14px; line-height:40px;">Follow Code Boost on</p>
          <ul style="display:flex; list-style:none;align-items:center;">
            <li style="margin: 10px;">
              <a href="https://twitter.com/BoostCode" style="color:#fff;">
              Twitter
              </a>
            </li>
            <li style="margin: 10px;">
              <a href="https://www.linkedin.com/in/code-boost-7038341a7/" style="color:#fff;">Linkedin</a>
            </li>
            <li style="margin: 10px;">
              <a href="https://www.facebook.com/Code-Boost-102807441437727/" style="color:#fff;">Facebook</a>
            </li>
            </ul>
        </div>  
      </div>
    </div>`, // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = {
  sendConfirmation,
};
