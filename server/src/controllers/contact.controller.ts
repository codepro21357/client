import { NextFunction, Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';
import logger from '../utils/logger.utils';
import ErrorHandler from '../utils/errorHandler.utils';
import { ContactType } from '../schema/contact.schema';

// SEND CONTACT HANDLER
export const sendContactHandler = async (
  req: Request<{}, {}, ContactType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, firstName, lastName, message } = req.body;

    // Create email body
    const emailBody = `
      <h2>Contact Form Submission</h2>
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `;

    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: process.env.TO_ADMIN,
      subject: 'From Reinholders',
      html: emailBody,
    };

    transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (err: any) {
    logger.error(err);
    const error = new ErrorHandler('Failed to send email', 500);
    next(error);
  }
};
