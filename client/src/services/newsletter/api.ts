import { LoginDataType } from "@/app/(routes)/login/schema";
import { RegisterDataType } from "@/app/(routes)/register/schema";
import { api } from "../axios";

export const createNewsletter = async (data: { email: string }) => {
  const res = await api.post("/api/newsletters/", data);
  return res.data;
};
