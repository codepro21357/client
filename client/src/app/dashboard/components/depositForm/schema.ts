import * as z from "zod";

export const schema = z.object({
  coinType: z.string().min(1, { message: "Select coin type" }),
  amount: z.string().min(1, { message: "Coin amount is required!" }),
  total: z.string().min(1, { message: "Coin total in USD is required!" }),
});

export type DepositDataType = z.infer<typeof schema>;
