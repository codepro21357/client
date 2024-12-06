import * as z from "zod";

export const schema = z.object({
  balance: z
    .string()
    .min(1, { message: "User balance field can not be empty!" }),
  equity: z.string().min(1, { message: "Equity field can not be empty!" }),
  openPl: z.string().min(1, { message: "OpenPl field can not be empty!" }),
  closePl: z.string().min(1, { message: "ClosePl field can not be empty!" }),
  freeMargin: z
    .string()
    .min(1, { message: "Free Margin field can not be empty!" }),
  marginLevel: z
    .string()
    .min(1, { message: "Margin Level field can not be empty!" }),
  credit: z.string().min(1, { message: "Credit field can not be empty!" }),
});

export type EditUserType = z.infer<typeof schema>;
