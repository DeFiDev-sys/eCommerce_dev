import nodemailer from "nodemailer";
//dlsg nqqm eutx fohp
//juwonjay2001@gmail.com

export const sendVerificationEmail = (token, name, email) => {
  const html = `
        <html>
            <body>
                <h3>Dear ${name}</h3>
                <p>Thank you for signing up with Jay Techs</p>
                <p>Use the link below to verify you email</p>
                <a href="http://localhost:3000/email-verify/${token}">Click Here!</a>
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
    subject: "Verify your email address",
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
