import mongoose, { InferSchemaType, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    country: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least six (6) characters'],
    },
    agreement: Boolean,
    avatar: {
      public_id: String,
      url: String,
    },
    equity: { type: String, default: '0.00' },
    balance: { type: String, default: '0.00' },
    openPl: { type: String, default: '0.00' },
    closePl: { type: String, default: '0.00' },
    freeMargin: { type: String, default: '0.00' },
    marginLevel: { type: String, default: '0.00' },
    credit: { type: String, default: '0.00' },
    token: { type: String, default: '' },
    role: { type: String, default: 'user' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type UserType = InferSchemaType<typeof UserSchema>;

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  if (!user.password) return;

  const salt = await bcrypt.genSalt(
    config.get<number>('saltWorkFactor'),
  );
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

const userModel = mongoose.model<UserType>('User', UserSchema);

export default userModel;
