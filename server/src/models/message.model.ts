import mongoose, { InferSchemaType, Schema } from 'mongoose';

const MessageSchema = new Schema(
  {
    senderId: { type: String, required: true },
    chatId: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    avatar: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true },
);

export type MessageType = InferSchemaType<typeof MessageSchema>;

const messageModel = mongoose.model<MessageType>(
  'Message',
  MessageSchema,
);

export default messageModel;
