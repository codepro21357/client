import mongoose, { InferSchemaType, Schema } from 'mongoose';

const NewsletterSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

type NewsletterType = InferSchemaType<typeof NewsletterSchema>;

const newsletterModel = mongoose.model<NewsletterType>(
  'Newsletter',
  NewsletterSchema,
);

export default newsletterModel;
