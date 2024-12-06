import mongoose, { InferSchemaType, Schema } from 'mongoose';

const ChatSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    lastMessage: { type: String, required: true },
    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export type ChatType = InferSchemaType<typeof ChatSchema>;

const chatModel = mongoose.model<ChatType>('Chat', ChatSchema);

export default chatModel;
