import Newsletter from '../models/newsletter.model';
import { INewsletterRequestBody } from '../types';
import ErrorHandler from '../utils/errorHandler.utils';

// CREATE NEWSLETTER
export const createNewsletter = async (
  input: INewsletterRequestBody,
) => {
  const newsletter = await Newsletter.create(input);
  return newsletter;
};

// GET ALL NEWSLETTERS
export const getAllNewsletters = async () => {
  const newsletters = await Newsletter.find().sort({ createdAt: -1 });

  return newsletters;
};

// DELETE NEWSLETTER
export const deleteNewsletter = async (id: string) => {
  const newsletter = await Newsletter.findByIdAndDelete(id);

  if (!newsletter) {
    throw new ErrorHandler('Newsletter not found', 404);
  }

  return newsletter;
};
