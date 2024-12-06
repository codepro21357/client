import * as z from "zod";

export const schema = z.object({
  status: z.string().min(1, { message: "Status is required!" }),
});

export type EditTransactionType = z.infer<typeof schema>;
