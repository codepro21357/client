import { ContactDataType } from "@/app/(routes)/contact/schema";
import { api } from "../axios";

export const sendContact = async (data: ContactDataType) => {
  const res = await api.post("/api/contacts/", data);
  return res.data;
};
