import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth as BetterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = BetterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["admin", "user"],
        defaultValue: "user",
        input: false,
        required: false,
      },
    },
  },
});
