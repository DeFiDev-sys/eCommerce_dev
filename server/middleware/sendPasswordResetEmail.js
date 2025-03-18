import nodemailer from "nodemailer";
//dlsg nqqm eutx fohp
//juwonjay2001@gmail.com

export const sendPasswordResetEmail = (token, name, email) => {
  const html = `
        <html>
            <body>
            <h1>Reset your password</h1>
                <h3>Dear ${name}</h3>
                <p>Click on the link to reset your password</p>
                <a href="http://localhost:3000/password-reset/${token}">Click Here!</a>
            </body>
        </html>
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "juwonjay2001@gmail.com",
      pass: "dlsg nqqm eutx fohp",
    },
  });

  const mailOptions = {
    from: "jayTechsSupport@gmail.com",
    to: email,
    subject: "Jay Techs reset password request",
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent to ${email}`);
      console.log(info.response);
    }
  });
};
