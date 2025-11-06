app.post('/send-feedback', async (req, res) => {
  const { email, message, type } = req.body;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'homagrills@gmail.com', pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: email, // ✅ actual user's email
    to: 'homagrills@gmail.com',
    subject: `${type} from ${email}`,
    text: message
  });

  res.send({ success: true });
});
