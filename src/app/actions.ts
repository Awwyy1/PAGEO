"use server";
import { revalidatePath } from "next/cache";

export async function revalidateProfilePage(username: string) {
  if (username) revalidatePath(`/${username}`);
}
