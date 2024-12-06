import * as z from "zod";

export const schema = z.object({
  amount: z.string().min(1, { message: "Amount is required!" }),
  walletAddress: z.string().min(1, { message: "Wallet address is required!" }),
});

export type WithdrawDataType = z.infer<typeof schema>;
