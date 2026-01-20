import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function userOnlyPage() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user || !user.user) redirect("/login");

  return user.user;
}

export async function adminOnlyPage() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user || !user.user) redirect("/login");
  if (user.user.role !== "admin") redirect("/dashboard");

  return user.user;
}

export async function unverifiedUserOnlyPage() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user || !user.user) redirect("/login");
  if (user.user.emailVerified) redirect("/dashboard");

  return user.user;
}

export async function publicOnlyPage() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (user && user.user) redirect("/dashboard");

  return null;
}
